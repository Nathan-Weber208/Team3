import { renderListWithTemplate, getLocalStorage, setLocalStorage } from './utils.js';

export default class CartList {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
    this.total = 0;
  }

  async init() {
    const list = getLocalStorage(this.key);
    if(list) {
      this.calculateListTotal(list);
      this.renderList(list);
    }
  }

  prepareTemplate(template, product) {
    template.querySelector('.cart-card__image img').src =
      product.Images.PrimaryMedium;
    template.querySelector('.cart-card__image img').alt += product.Name;
    template.querySelector('.card__name').textContent = product.Name;
    template.querySelector('.cart-card__color').textContent =
      product.Colors[0].ColorName;
    template.querySelector('.cart-card__quantity').textContent = `Qty : ${product.Count}`
    template.querySelector('.cart-card__price').textContent +=
      product.FinalPrice;

      template.querySelector('.add-button').addEventListener('click', () => {
        let cart = getLocalStorage('so-cart');
        for(let iProduct = 0; iProduct < cart.length ; iProduct++){
          if(cart[iProduct].Id == product.Id){
            cart[iProduct].Count++;
            setLocalStorage('so-cart', cart);  
            break;
          }
        }
        for(let iProduct = 0; iProduct < cart.length ; iProduct++){
          if(cart[iProduct].Id == product.Id){
            cart[iProduct].Count--;
            if (cart[iProduct].Count == 0){
              product.pop(cart[iProduct].Id);
            }
            setLocalStorage('so-cart', cart);  
            break;
          }
        }
      })
    return template;


  }
  calculateListTotal(list) {
      const amounts = list.map((item) => item.FinalPrice);
      this.total = amounts.reduce((sum, item) => sum + item, 0);
  }
  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = '';
    //get the template
    const template = document.getElementById('cart-card-template');
    renderListWithTemplate(
      template,
      this.listElement,
      list,
      this.prepareTemplate
    );
    document.querySelector('.cart-total').innerText += `Total: $${this.total}`;
  }

}