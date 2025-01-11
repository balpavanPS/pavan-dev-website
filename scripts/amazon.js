import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";
const timeoutMap = new Map();

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img
                class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
        </div>

        <div class="product-price">$${formatCurrency(product.priceCents)}</div>

        <div class="product-quantity-container">
            <select class="js-product-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id = "${
          product.id
        }">Add to Cart</button>
    </div>`;
});

document.querySelector(".products-grid").innerHTML = productsHTML;

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".js-cart-quantity").innerText = cartQuantity;
}

function displayAddedSubtext(productId) {
  const addedToCartElement = document.querySelector(
    `.js-added-to-cart-${productId}`
  );

  // Clear any existing timeout for this product
  if (timeoutMap.has(productId)) {
    clearTimeout(timeoutMap.get(productId));
  }

  addedToCartElement.classList.add("added-to-cart-enabled");

  // Set a new timeout and store it in the map
  const timeoutId = setTimeout(() => {
    addedToCartElement.classList.remove("added-to-cart-enabled");
    timeoutMap.delete(productId); // Cleanup after timeout
  }, 2000);

  timeoutMap.set(productId, timeoutId);
}

document.querySelectorAll(".js-add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;

    addToCart(productId);

    updateCartQuantity();

    displayAddedSubtext(productId);
  });
});
