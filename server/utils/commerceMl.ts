import { XMLParser } from 'fast-xml-parser'
import { prisma } from './prisma'

function asArray<T>(value: T | T[] | undefined | null): T[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const ruMap: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch', ы: 'y', э: 'e', ю: 'yu', я: 'ya', ь: '', ъ: ''
}

export function slugify(input: string) {
  return input.toLowerCase().split('').map((char) => ruMap[char] ?? char).join('')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80) || `item-${Date.now()}`
}

function readNameValue(source: any, listName: string, itemName: string, name: string) {
  const items = asArray(source?.[listName]?.[itemName])
  const found = items.find((item: any) => String(item?.Наименование || item?.Название || '').trim().toLowerCase() === name.toLowerCase())
  return found?.Значение || found?.Значения || found?.Value || null
}

function readProductProp(product: any, names: string[]) {
  for (const name of names) {
    const fromReq = readNameValue(product, 'ЗначенияРеквизитов', 'ЗначениеРеквизита', name)
    if (fromReq) return String(fromReq)
    const fromChars = readNameValue(product, 'ХарактеристикиТовара', 'ХарактеристикаТовара', name)
    if (fromChars) return String(fromChars)
  }
  return null
}

function readOfferMap(root: any) {
  const offers = asArray(root?.ПакетПредложений?.Предложения?.Предложение)
  const map = new Map<string, { price?: number; stock?: number }>()
  for (const offer of offers) {
    const id = String(offer?.Ид || '').split('#')[0]
    if (!id) continue
    const priceRaw = asArray(offer?.Цены?.Цена)[0]?.ЦенаЗаЕдиницу || offer?.ЦенаЗаЕдиницу
    const stockRaw = offer?.Количество
    map.set(id, {
      price: priceRaw ? Number(String(priceRaw).replace(',', '.')) : undefined,
      stock: stockRaw ? Number(stockRaw) : undefined
    })
  }
  return map
}

export async function importCommerceMl(xml: string, source: 'MANUAL' | 'CRON' = 'MANUAL') {
  const started = Date.now()
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '', processEntities: false, allowBooleanAttributes: true, trimValues: true })
  const log = await prisma.syncLog.create({ data: { source, type: 'IMPORT_1C', status: 'PARTIAL', message: 'Import started', rowsProcessed: 0 } })
  const errors: Array<{ externalId?: string; message: string }> = []
  let rowsProcessed = 0

  try {
    const parsed = parser.parse(xml)
    const root = parsed?.КоммерческаяИнформация || parsed
    const groups = asArray(root?.Классификатор?.Группы?.Группа)
    const offers = readOfferMap(root)

    for (const group of groups) {
      const externalId = String(group?.Ид || '')
      const name = String(group?.Наименование || 'Категория')
      if (!externalId) continue
      await prisma.category.upsert({
        where: { externalId },
        update: { name, slug: slugify(name), description: group?.Описание || null },
        create: { externalId, name, slug: slugify(name), description: group?.Описание || null }
      })
      rowsProcessed++
    }

    let defaultCategory = await prisma.category.findFirst({ where: { slug: 'yakutskie-nozhi' } })
    if (!defaultCategory) defaultCategory = await prisma.category.create({ data: { slug: 'yakutskie-nozhi', name: 'Якутские ножи' } })

    for (const product of asArray(root?.Каталог?.Товары?.Товар)) {
      const externalId = String(product?.Ид || '')
      try {
        const name = String(product?.Наименование || 'Нож NOMOKH')
        const description = String(product?.Описание || readProductProp(product, ['Описание']) || 'Описание уточняется')
        const groupId = String(asArray(product?.Группы?.Ид)[0] || '')
        const category = groupId ? await prisma.category.findUnique({ where: { externalId: groupId } }) : defaultCategory
        const offer = offers.get(externalId)
        const slug = slugify(`${name}-${externalId.slice(0, 8)}`)
        const data = {
          name,
          description,
          price: offer?.price || Number(readProductProp(product, ['Цена']) || 0) || 1,
          stockQty: offer?.stock ?? Number(readProductProp(product, ['Количество', 'Остаток']) || 0),
          steel: readProductProp(product, ['Сталь', 'Марка стали']),
          handleMaterial: readProductProp(product, ['Рукоять', 'Материал рукояти']),
          bladeLength: Number(readProductProp(product, ['Длина клинка']) || 0) || null,
          length: Number(readProductProp(product, ['Общая длина', 'Длина']) || 0) || null,
          categoryId: category?.id || defaultCategory.id,
          isActive: true
        }
        await prisma.product.upsert({
          where: (externalId ? { externalId } : { slug }) as any,
          update: data,
          create: { externalId: externalId || undefined, slug, ...data } as any
        })
        rowsProcessed++
      } catch (error: any) {
        errors.push({ externalId, message: error.message })
      }
    }

    const status = errors.length ? 'PARTIAL' : 'SUCCESS'
    await prisma.syncLog.update({ where: { id: log.id }, data: { status, rowsProcessed, errorsJson: errors.length ? errors : undefined, message: `Imported ${rowsProcessed} rows in ${Date.now() - started}ms` } })
    return { status, rowsProcessed, errors }
  } catch (error: any) {
    await prisma.syncLog.update({ where: { id: log.id }, data: { status: 'FAILED', rowsProcessed, errorsJson: errors, message: error.message } })
    throw error
  }
}
