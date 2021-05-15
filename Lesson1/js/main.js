class ProductList {
    constructor(container = '.products', get = `/catalogData.json`) {
        this.API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
        this.container = container;
        this.block = document.querySelector(this.container);
        this.goods = []; // куда прилетит массив товаров с сервера
        this.get = get;
    }

    makeGETRequest(url, callback) {
        let getRequest = (url) => {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status == 200) {
                            resolve(JSON.parse(xhr.response))
                        }
                        else {
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send();
            })
        };

        getRequest(`${this.API}${this.get}`)
            .then((data) => {
                this.goods = data;
                this.render();
            })
            .catch((error) => console.log(error));
    }


    fetchGoods() {
        this.makeGETRequest(`${this.API} `)

    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new ProductItem(good);
            listHtml += goodItem.render()
        }
        );
        document.querySelector(this.container).innerHTML = listHtml;
    }


    addToCart() {

        this.get = `/addToBasket.json`;


    }



    //         this.block.addEventListener('click', event => {
    //             if (event.target.classList.contains('add_btn')) {
    //                 const product_id = +event.target.dataset.id;
    //                 const productToAdd = this.goods.find((product) => product.id === product_id);
    //                 this.addToCart(productToAdd)
    //             }
    //             else return;
    //         })
    //     }
    //     addToCart() {
    //         this.makeADDRequest(productToAdd)
    //     }
}
class ProductItem {
    constructor(good, img = 'http://via.placeholder.com/200x150') {
        this.id = good.id_product;
        this.title = good.product_name;
        this.price = good.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item" >
    <img src="${this.img}" alt="Some img">
        <div class="desc">
            <h3>${this.title}</h3>
            <p>${this.price} 	&#65509</p>
            <button class="buy-btn add_btn" data-id="${this.id}">Add to cart</button>
        </div>
  </div>`;
    }

}

class CartList extends ProductList {
    constructor(container = '.cart', get = `/getBasket.json`) {
        super(container, get);
        this.productToAdd;
        this.productToDelete;
        this.showCart();
        this.addEventHandlers();
    }

    render() {
        let listHtml = '';
        this.goods.contents.forEach(good => {
            const goodItem = new CartItem(good);
            listHtml += goodItem.render();
        }
        );

        document.querySelector(this.container).innerHTML = listHtml;
        document.querySelector(this.container).insertAdjacentHTML('beforeend',
            `<div class="total">
        <img src="images/lookMorty.jpg" alt="lookMorty">
        <div class="cart_info">
        <p> Total price: ${this.goods.amount} &#65509</p>
        <p>Total quantity: ${this.goods.countGoods} pcs</p>
        <div class="cart_buttons">
        <button class="buy-btn">Buy</button>
        <button class="buy-btn clear_cart">Clear cart</button>
    </div>
        </div>
    </div>
    `)

    }
    showCart() {
        let cartBlock = document.querySelector('.cart');
        let cartButton = document.querySelector('.cart_btn');
        cartButton.addEventListener('click', () => cartBlock.style.display = cartBlock.style.display == "none" ? "block" : "none");
        cartButton.addEventListener('click', () => cartButton.style.background = cartBlock.style.display == "none" ? "#d5cabe" : "rgb(236, 236, 202)");
    }

    makeGETRequestToAdd(url, callback, productToAdd) {
        let getRequest = (url) => {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status == 200) {
                            resolve(JSON.parse(xhr.response))
                        }
                        else {
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send();
            })
        };

        getRequest(`${this.API}${this.get}`)
            .then((data) => {
                this.quantity = +data.result;
                this.productToAdd.quantity += this.quantity;
                this.render();
            })
            .catch((error) => console.log(error));
    }

    makeGETRequestToDelete(url, callback, productToAdd) {
        let getRequest = (url) => {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status == 200) {
                            resolve(JSON.parse(xhr.response))
                        }
                        else {
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send();
            })
        };

        getRequest(`${this.API}${this.get}`)
            .then((data) => {
                this.quantity = +data.result;
                this.productToDelete.quantity -= this.quantity;
                this.render()
            })
            .catch((error) => console.log(error));
    }

    addEventHandlers() {
        window.addEventListener('click', event => {
            if (event.target.classList.contains('add_btn')) {
                const product_id = +event.target.dataset.id;
                this.goodsList = this.goods.contents;
                this.productToAdd = this.goodsList.find((product) => product.id_product === product_id);
                this.get = `/addToBasket.json`
                this.makeGETRequestToAdd(this)
            }
            if (event.target.classList.contains('del_btn')) {
                const product_id = +event.target.dataset.id;
                this.goodsList = this.goods.contents;
                this.productToDelete = this.goodsList.find((product) => product.id_product === product_id);
                this.get = `/deleteFromBasket.json`
                this.makeGETRequestToDelete(this)
            } else return;
        })
    }

}

class CartItem extends ProductItem {
    constructor(good, img = 'http://via.placeholder.com/200x150') {
        super(good);
        this.quantity = good.quantity;
    }

    render() {
        return `<div div class="cart-item" >
    <img src="${this.img}" alt="Some img">
        <div class="cart-desc">
            <h3>${this.title}</h3>
            <p>${this.price} 	&#65509</p>
            <p>${this.quantity} pcs</p>
        </div>
        <button class="buy-btn del_btn" data-id="${this.id}"> Delete</button>
                      </div>`;
    }
}


const list = new ProductList();
list.fetchGoods(() => {
    list.render();
});


const cart = new CartList();
cart.fetchGoods(() => {
    cart.render();
});
//     getCartLength() { //определяем длину массива корзины
//         return this.allProducts.length;
//     }

//     getTotalQuantity() {
//         const block = document.querySelector('.quantity');
//         let sumQuantity = 0;
//         this.allProducts.forEach(good => { sumQuantity += good.quantity });
//         block.insertAdjacentHTML("afterbegin", `Quantity:	& nbsp; ${ sumQuantity } pcs.`);
//     };
//     getTotalPrice() {
//         const block = document.querySelector('.total');
//         let sum = 0;
//         this.allProducts.forEach(good => { sum += (good.price * good.quantity) });
//         block.insertAdjacentHTML("afterbegin", `Total:	& nbsp; ${ sum } &#65509`);
//     };

//     renewTotal() {
//         const blockQ = document.querySelector('.quantity');
//         const blockT = document.querySelector('.total');
//         blockQ.textContent = '';
//         blockT.textContent = '';
//     }

//     addEventHandlers() {
//         window.addEventListener('click', event => {
//             if (event.target.classList.contains('add_btn')) {
//                 const product_id = +event.target.dataset.id;
//                 const productToAdd = this.goods.find((product) => product.id === product_id);
//                 this.addToCart(productToAdd)
//             }
//             if (event.target.classList.contains('clear_cart')) { this.clearCart() }
//             if (event.target.classList.contains('del_btn')) {
//                 const product_id = +event.target.dataset.id;
//                 const productToDelete = this.allProducts.find((product) => product.id === product_id);
//                 this.deleteItem(productToDelete)
//             }
//             else return;
//         })
//     }

//     addToCart(product) { //пушим в массив корзины 
//         if (product) {
//             const findInCatalog = this.allProducts.find(({ id }) => product.id === id);
//             if (findInCatalog) {
//                 findInCatalog.quantity++;
//             } else {
//                 this.allProducts.push({ ...product, quantity: 1 });
//             }
//             this.block.textContent = '';
//             this.render();
//         } else {
//             alert('Ошибка добавления!');
//         }

//     }

//     deleteItem(product) { //метод удаления из корзины
//         this.allProducts.pop({ ...product });
//         this.clearCart();
//         this.clearTotal();
//         this.render();
//     }

//     clearCart() {
//         this.allProducts = [];
//         const block = document.querySelector(this.container);
//         block.innerHTML = '';
//         block.insertAdjacentHTML('afterend', `< p class = "empty" > empty</ > `);
//     }

//     clearTotal() {
//         const blockQ = document.querySelector('.quantity');
//         const blockT = document.querySelector('.total');
//         blockQ.textContent = 'Quantity:	0 pcs.';
//         blockT.textContent = "Total: 0 ";

//     }
// }

// class CartItem extends ProductItem {
//     constructor(product, img = 'http://via.placeholder.com/200x150') {
//         super(product);
//         this.quantity = product.quantity;

//     }

//     render() {
//         return `< div class="cart-item" >
//                       <img src="${this.img}" alt="Some img">
//                       <div class="cart-desc">
//                           <h3>${this.title}</h3>
//                           <p>${this.price} 	&#65509 per 1 item</p>
//                           <p>${this.quantity} pcs</p>
//                       </div>
//                       <button class="buy-btn del_btn" data-id="${this.id}"> Delete</button>
//                   </>`;
//     }

// }

// 'use strict';
// const products = [
//     { id: 1, title: 'Notebook', price: 20000 },
//     { id: 2, title: 'Mouse', price: 1500 },
//     { id: 3, title: 'Keyboard', price: 5000 },
//     { id: 4, title: 'Gamepad', price: 4500 },
// ];

// const renderProduct = (title = 'name', price = 'unknown') => `<div class="product-item"> <h3>${title}</h3> <p>${price} руб.</p> <button class="by-btn">Добавить в корзину</button></div>`;
// const renderProducts = list => {
//     document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join(' ');
// };

// renderProducts(products);
