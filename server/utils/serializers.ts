export function serializeProduct(product: any) {
  const images = product.images || []
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    story: product.story,
    price: Number(product.price),
    oldPrice: product.oldPrice == null ? null : Number(product.oldPrice),
    currency: product.currency,
    stockQty: product.stockQty,
    weight: product.weight,
    length: product.length,
    bladeLength: product.bladeLength,
    steel: product.steel,
    handleMaterial: product.handleMaterial,
    bolster: product.bolster,
    sheath: product.sheath,
    isAuction: product.isAuction,
    category: product.category ? { id: product.category.id, slug: product.category.slug, name: product.category.name } : null,
    imageUrl: images[0]?.url || '/demo/knife-1.svg',
    images: images.map((image: any) => ({ id: image.id, url: image.url, alt: image.alt, sortOrder: image.sortOrder }))
  }
}

export function serializeCart(cart: any) {
  const items = (cart.items || []).map((item: any) => ({
    id: item.id,
    quantity: item.quantity,
    priceSnapshot: Number(item.priceSnapshot),
    product: serializeProduct(item.product)
  }))
  return {
    id: cart.id,
    items,
    totalAmount: items.reduce((sum: number, item: any) => sum + item.quantity * item.priceSnapshot, 0),
    totalQuantity: items.reduce((sum: number, item: any) => sum + item.quantity, 0)
  }
}

export function serializeOrder(order: any) {
  return {
    ...order,
    totalAmount: Number(order.totalAmount),
    deliveryAmount: Number(order.deliveryAmount),
    discountAmount: Number(order.discountAmount),
    items: order.items?.map((item: any) => ({ ...item, priceSnapshot: Number(item.priceSnapshot) })) || []
  }
}
