import { readBody } from 'h3'
import { requireAdmin } from '~/server/utils/auth'
import { importCommerceMl } from '~/server/utils/commerceMl'
import { fail, ok } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event).catch(() => ({}))
  let xml = body?.xml
  if (!xml && body?.xmlUrl) {
    const response = await fetch(String(body.xmlUrl), { headers: { accept: 'application/xml,text/xml' } })
    if (!response.ok) fail('VALIDATION_ERROR', 'Не удалось скачать XML из 1C')
    xml = await response.text()
  }
  if (!xml || typeof xml !== 'string') fail('VALIDATION_ERROR', 'Передайте xml или xmlUrl')
  if (xml.length > 25 * 1024 * 1024) fail('VALIDATION_ERROR', 'XML слишком большой для ручного импорта')
  const result = await importCommerceMl(xml, 'MANUAL')
  return ok(result)
})
