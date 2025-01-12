// import { cart } from "../../data/cart.js";
import Cart from "../../data/cart-class.js";
import { getItemPrice } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export default function RenderPaymentSummary() {
  const cartObj = new Cart("cart");
  const cart = cartObj.cartItems;
  let totalItems = 0;
  let html = "";
  let totalItemsPrice = 0;
  let shippingPrice = 0;
  cart.forEach((cartItem) => {
    const { quantity, productId, deliveryOptionId } = cartItem;
    const cartItemPrice = quantity * getItemPrice(productId);
    totalItems += quantity;
    totalItemsPrice += cartItemPrice;
    const { priceCents } = getDeliveryOption(deliveryOptionId);
    shippingPrice += priceCents;
  });

  const totalPriceBeforeTax = totalItemsPrice + shippingPrice;
  const taxAmount = totalPriceBeforeTax * 0.1;
  const totalPriceAfterTax = totalPriceBeforeTax + taxAmount;

  html = `
  <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalItemsPrice
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPrice
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalPriceBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxAmount
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalPriceAfterTax
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;

  document.querySelector(".payment-summary").innerHTML = html;
}
