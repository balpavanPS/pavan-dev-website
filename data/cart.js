export const cart = [];

export function addToCart(productId) {
  let matchingItem;
  const quantity = Number(
    document.querySelector(`.js-product-selector-${productId}`).value
  );

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }
}
