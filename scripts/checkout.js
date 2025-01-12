import RenderOrderSummary from "./checkout/orderSummary.js";
import RenderPaymentSummary from "./checkout/paymentSummary.js";
import RenderCheckOutHeader from "./checkout/checkOutHeader.js";
import "../data/cart-class.js";
// import "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";

loadProducts(() => {
  RenderCheckOutHeader();
  RenderOrderSummary();
  RenderPaymentSummary();
});
