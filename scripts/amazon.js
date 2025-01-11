import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";
let timeoutId;

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

        <div class="product-price">$${(product.priceCents / 100).toFixed(
          2
        )}</div>

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

document.querySelectorAll(".js-add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    clearTimeout(timeoutId);
    const { productId } = button.dataset;
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

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerText = cartQuantity;

    const addedToCartElement = document.querySelector(
      `.js-added-to-cart-${productId}`
    );
    addedToCartElement.classList.add("added-to-cart-enabled");

    timeoutId = setTimeout(() => {
      addedToCartElement.classList.remove("added-to-cart-enabled");
    }, 2000);
  });
});
