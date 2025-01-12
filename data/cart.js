export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
    deliveryOptionId: "1",
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
    deliveryOptionId: "2",
  },
];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

export function removeCartItem(productID) {
  //   const newCart = [];
  //   cart.forEach((item) => {
  //     if (productID !== item.productId) {
  //       newCart.push(item);
  //     }

  cart = cart.filter((item) => productID !== item.productId);
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  console.log(
    "deliveryOptionId: " + deliveryOptionId + " productId: " + productId
  );
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  console.log(matchingItem);
  saveToStorage();
}
