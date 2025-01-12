// import { cart, removeCartItem, updateDeliveryOption } from "../../data/cart.js";
import Cart from "../../data/cart-class.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import RenderPaymentSummary from "./paymentSummary.js";
import RenderCheckOutHeader from "./checkOutHeader.js";

export default function RenderOrderSummary() {
  let checkoutHTML = "";

  const cartObj = new Cart("cart");
  const cart = cartObj.cartItems;

  cart.forEach((cartItem) => {
    let matchingProduct;
    const deliveryOptionId = cartItem.deliveryOptionId;
    let option;
    const productID = cartItem.productId;
    products.forEach((product) => {
      if (productID === product.id) {
        matchingProduct = product;
      }
    });

    deliveryOptions.forEach((deliveryOption) => {
      if (deliveryOptionId === deliveryOption.deliveryOptionId) {
        option = deliveryOption;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    checkoutHTML += `
        <div class="cart-item-container js-cart-item-container-${
          matchingProduct.id
        }">
              <div class="delivery-date">Delivery date: ${dateString}</div>
                  <div class="cart-item-details-grid">
                    <img
                      class="product-image"
                      src="${matchingProduct.image}"
                    />
                    <div class="cart-item-details">
                      <div class="product-name">
                        ${matchingProduct.name}
                      </div>
                      <div class="product-price">$${formatCurrency(
                        matchingProduct.priceCents
                      )}</div>
                      <div class="product-quantity js-product-quantity-${
                        matchingProduct.id
                      }">
                        <span> Quantity: <span class="quantity-label">${
                          cartItem.quantity
                        }</span> </span>
                        <span class="update-quantity-link link-primary">
                          Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-quantity-link js-delete-quantity-link-${
                          matchingProduct.id
                        }" data-product-id = ${matchingProduct.id}>
                          Delete
                        </span>
                      </div>
                    </div>
      
                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      ${rendorDeliveryOptions(matchingProduct, cartItem)}
                    </div>
                  </div>
                </div>`;
  });
  document.querySelector(".js-order-summary").innerHTML = checkoutHTML;

  document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productID = link.dataset.productId;
      cartObj.removeCartItem(productID);
      const container = document.querySelector(
        `.js-cart-item-container-${productID}`
      );
      if (container) {
        container.remove();
      }

      RenderCheckOutHeader();
      RenderPaymentSummary();
    });
  });

  function rendorDeliveryOptions(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((option) => {
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        option.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(option.priceCents)} -`;

      const isChecked = option.deliveryOptionId === cartItem.deliveryOptionId;
      html += `
        <div class="delivery-option js-delivery-option"
        data-product-id = "${matchingProduct.id}"
        data-delivery-option-id = "${option.deliveryOptionId}">
            <input
            ${isChecked ? "checked" : ""}
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
            />
            <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} Shipping</div>
            </div>
        </div>
        `;
    });

    return html;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      cartObj.updateDeliveryOption(productId, deliveryOptionId);
      RenderOrderSummary();
      RenderPaymentSummary();
    });
  });
}
