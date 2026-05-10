import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import tailwindConfig from '../../tailwind.config'

function readProjectFile(path: string) {
  return readFileSync(join(process.cwd(), path), 'utf8')
}

describe('NOMOKH brand design contract', () => {
  it('keeps premium northern color tokens available', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>

    expect(colors.obsidian).toBe('#0B0D10')
    expect(colors.graphite).toBe('#14181E')
    expect(colors.steel).toBe('#AAA292')
    expect(colors.bone).toBe('#EEE8DE')
    expect(colors.brass).toBe('#B08D57')
    expect(colors.silver).toBe('#C8D4E3')
    expect(colors.moss).toBe('#6E8778')
  })

  it('surfaces provenance, packaging, and authenticity in purchase flow', () => {
    const home = readProjectFile('pages/index.vue')
    const product = readProjectFile('pages/product/[id].vue')
    const checkout = readProjectFile('pages/checkout.vue')

    expect(home).toContain('Подарочная упаковка')
    expect(product).toContain('Проверка подлинности')
    expect(product).toContain('Как ухаживать')
    expect(checkout).toContain('Сертификат')
    expect(checkout).toContain('Подарочная упаковка включена')
  })
})
