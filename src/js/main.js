import ProductData from './productData.js';
import ProductList from './productList.js';

// instance of ProductData class
const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list');
// instance of ProductList 
const myList = new ProductList('tents', dataSource, listElement);
myList.init();