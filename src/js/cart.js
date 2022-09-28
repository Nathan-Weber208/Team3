import {loadHeaderFooter} from './utils';

loadHeaderFooter();

const shopping_cart = document.querySelector('.cart')
const cart_buttons = document.querySelectorAll('.addToCart')

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = '';
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => renderCartItem(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  console.log(newItem);
  return newItem;
}

getCartContents();

for(cart_buttons of cart_buttons) {
    cart_buttons.onclick = (e)=> {
      let product_count = Number(shopping_cart.getAttribute('data-product-count')) || 0;
      shopping_cart.setAttribute('data-product-count', product_count + 1); 
    }
}