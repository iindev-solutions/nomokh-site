import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function upsertProduct(data: {
  slug: string
  name: string
  description: string
  story: string
  price: number
  oldPrice?: number
  stockQty: number
  weight: number
  length: number
  bladeLength: number
  steel: string
  handleMaterial: string
  sheath: string
  categoryId: string
  image: string
  sortOrder: number
}) {
  const product = await prisma.product.upsert({
    where: { slug: data.slug },
    update: {
      name: data.name,
      description: data.description,
      story: data.story,
      price: data.price,
      oldPrice: data.oldPrice,
      stockQty: data.stockQty,
      weight: data.weight,
      length: data.length,
      bladeLength: data.bladeLength,
      steel: data.steel,
      handleMaterial: data.handleMaterial,
      sheath: data.sheath,
      categoryId: data.categoryId,
      sortOrder: data.sortOrder,
      isActive: true
    },
    create: {
      slug: data.slug,
      name: data.name,
      description: data.description,
      story: data.story,
      price: data.price,
      oldPrice: data.oldPrice,
      stockQty: data.stockQty,
      weight: data.weight,
      length: data.length,
      bladeLength: data.bladeLength,
      steel: data.steel,
      handleMaterial: data.handleMaterial,
      sheath: data.sheath,
      categoryId: data.categoryId,
      sortOrder: data.sortOrder,
      isActive: true
    }
  })

  await prisma.productImage.deleteMany({ where: { productId: product.id } })
  await prisma.productImage.create({ data: { productId: product.id, url: data.image, alt: data.name, sortOrder: 1 } })
  return product
}

async function main() {
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'yakutskie-nozhi' },
      update: { name: 'Якутские ножи', description: 'Классические ножи северной школы: легкие, рабочие, с характерной геометрией клинка.', sortOrder: 1 },
      create: { slug: 'yakutskie-nozhi', name: 'Якутские ножи', description: 'Классические ножи северной школы: легкие, рабочие, с характерной геометрией клинка.', sortOrder: 1 }
    }),
    prisma.category.upsert({
      where: { slug: 'ohotnichyi' },
      update: { name: 'Охотничьи', description: 'Ножи для охоты, разделки и полевых задач.', sortOrder: 2 },
      create: { slug: 'ohotnichyi', name: 'Охотничьи', description: 'Ножи для охоты, разделки и полевых задач.', sortOrder: 2 }
    }),
    prisma.category.upsert({
      where: { slug: 'podarochnye' },
      update: { name: 'Подарочные', description: 'Премиальные клинки с историей, гравировкой и коллекционной подачей.', sortOrder: 3 },
      create: { slug: 'podarochnye', name: 'Подарочные', description: 'Премиальные клинки с историей, гравировкой и коллекционной подачей.', sortOrder: 3 }
    })
  ])

  const [yakut, hunt, gift] = categories

  const products = await Promise.all([
    upsertProduct({
      slug: 'batyy-classic',
      name: 'Батый Classic',
      description: 'Рабочий якутский нож для ежедневных задач, кухни, рыбалки и леса.',
      story: 'Батый — нож спокойной силы. Он не спорит с материалом, а ведет руку точно по волокну, как старый мастер ведет рассказ у огня.',
      price: 12900,
      oldPrice: 14900,
      stockQty: 12,
      weight: 145,
      length: 245,
      bladeLength: 135,
      steel: 'Х12МФ',
      handleMaterial: 'Карельская береза',
      sheath: 'Натуральная кожа',
      categoryId: yakut.id,
      image: '/demo/knife-1.svg',
      sortOrder: 1
    }),
    upsertProduct({
      slug: 'suluk-hunter',
      name: 'Сулук Hunter',
      description: 'Охотничий нож с устойчивой рукоятью и надежными кожаными ножнами.',
      story: 'Сулук сделан для длинной дороги: его силуэт напоминает русло северной реки, которая знает путь даже под снегом.',
      price: 18900,
      stockQty: 8,
      weight: 168,
      length: 260,
      bladeLength: 145,
      steel: 'D2',
      handleMaterial: 'Орех',
      sheath: 'Кожа растительного дубления',
      categoryId: hunt.id,
      image: '/demo/knife-2.svg',
      sortOrder: 2
    }),
    upsertProduct({
      slug: 'aikhal-premium',
      name: 'Айхал Premium',
      description: 'Подарочный клинок с акцентом на фактуру рукояти и историю изделия.',
      story: 'Айхал — пожелание славы и доброй судьбы. Такой нож дарят не как вещь, а как знак доверия.',
      price: 34900,
      stockQty: 3,
      weight: 156,
      length: 252,
      bladeLength: 138,
      steel: '95Х18',
      handleMaterial: 'Стабилизированная береза',
      sheath: 'Кожа, ручная прошивка',
      categoryId: gift.id,
      image: '/demo/knife-3.svg',
      sortOrder: 3
    }),
    upsertProduct({
      slug: 'tundra-field',
      name: 'Tundra Field',
      description: 'Практичный полевой нож с простым обслуживанием и хорошим балансом.',
      story: 'Tundra Field — про честную работу. Минимум лишнего, максимум контроля в мокрых перчатках и на морозе.',
      price: 9900,
      stockQty: 20,
      weight: 138,
      length: 238,
      bladeLength: 128,
      steel: 'ШХ15',
      handleMaterial: 'Береста',
      sheath: 'Натуральная кожа',
      categoryId: yakut.id,
      image: '/demo/knife-4.svg',
      sortOrder: 4
    })
  ])

  await prisma.user.upsert({
    where: { phone: process.env.SEED_ADMIN_PHONE || '+79990000000' },
    update: { role: 'ADMIN', name: 'Администратор NOMOKH' },
    create: { phone: process.env.SEED_ADMIN_PHONE || '+79990000000', role: 'ADMIN', name: 'Администратор NOMOKH' }
  })

  const auctionProduct = products[2]
  await prisma.product.update({ where: { id: auctionProduct.id }, data: { isAuction: true } })
  await prisma.auctionLot.upsert({
    where: { productId: auctionProduct.id },
    update: { currentPrice: 34900, startPrice: 34900, reservePrice: 45000, status: 'PENDING', startAt: new Date(Date.now() + 24 * 60 * 60 * 1000), endAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000) },
    create: { productId: auctionProduct.id, currentPrice: 34900, startPrice: 34900, reservePrice: 45000, status: 'PENDING', startAt: new Date(Date.now() + 24 * 60 * 60 * 1000), endAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000) }
  })

  console.log('Seed completed: categories, demo products, admin user, v2 auction lot')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
