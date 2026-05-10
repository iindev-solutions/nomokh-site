import { describe, expect, it } from 'vitest'
import { slugify } from '../../server/utils/commerceMl'

describe('slugify', () => {
  it('transliterates russian names for 1C import', () => {
    expect(slugify('Якутский нож Батый')).toBe('yakutskiy-nozh-batyy')
  })
})
