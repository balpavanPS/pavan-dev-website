import RenderOrderSummary from "./checkout/orderSummary.js";
import RenderPaymentSummary from "./checkout/paymentSummary.js";
import RenderCheckOutHeader from "./checkout/checkOutHeader.js";
import Cart from "../data/cart-class.js";
// import "../data/backend-practice.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";

const cartObj = new Cart("cart-test");

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    cartObj.loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  RenderCheckOutHeader();
  RenderOrderSummary();
  RenderPaymentSummary();
});
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      cartObj.loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    RenderCheckOutHeader();
    RenderOrderSummary();
    RenderPaymentSummary();
  });
*/
/*
loadProducts(() => {
  cartObj.loadCart(() => {
    RenderCheckOutHeader();
    RenderOrderSummary();
    RenderPaymentSummary();
  });
});
*/
