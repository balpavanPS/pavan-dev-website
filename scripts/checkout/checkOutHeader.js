// import { cart } from "../../data/cart.js";
import Cart from "../../data/cart-class.js";
export default function RenderCheckOutHeader() {
  const cartObj = new Cart("cart");
  const cart = cartObj.cartItems;
  let html = "";
  let checkOutItems = cart.length;
  //   console.log(checkOutItems);

  html = `
   Checkout (<a class="return-to-home-link" href="amazon.html">${checkOutItems} items</a
          >)
  `;

  document.querySelector(".checkout-header-middle-section").innerHTML = html;
}
