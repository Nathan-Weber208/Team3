import { setLocalStorage, getLocalStorage, loadHeaderFooter, alertMessage } from './utils.js';


loadHeaderFooter();
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector('main').innerHTML = this.renderProductDetails();
    // add listener to Add to Cart button
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  productInCart(cart){
    console.log(this.product);
   return Object.values(cart).filter((product)=>product.Id == this.product.Id).length > 0;
  }
 
  addToCart() {
     //Check if there is any data for the cart in local storage
        let cart = getLocalStorage('so-cart');
        if (cart == null){
          cart = [];
          this.product.Count = 1;
          cart.push(this.product);
            setLocalStorage('so-cart', cart);
        }else if (!this.productInCart(cart)){
          this.product.Count = 1;
          cart.push(this.product);
          setLocalStorage('so-cart', cart);
        }else {
          for(let iProduct = 0; iProduct < cart.length ; iProduct++){
            if(cart[iProduct].Id == this.product.Id){
              cart[iProduct].Count++;
              setLocalStorage('so-cart', cart);  
              break;
            }
          }
        }
  }
  renderProductDetails() {
    return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Images.PrimaryLarge}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${this.product.FinalPrice}</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`;
  }
}