import { cart } from "../../data/cart.js";
export default function RenderCheckOutHeader() {
  let html = "";
  let checkOutItems = cart.length;
  //   console.log(checkOutItems);

  html = `
   Checkout (<a class="return-to-home-link" href="amazon.html">${checkOutItems} items</a
          >)
  `;

  document.querySelector(".checkout-header-middle-section").innerHTML = html;
}
