class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = []; // куда прилетит массив товаров с сервера
        this.allProducts = [];// список нарендеренных товаров

        this.fetchGoods();
        this.render();

    }

    fetchGoods() {
        this.goods = [
            { id: 1, title: 'Neutrino Bomb', price: 20000 },
            { id: 2, title: 'Chris', price: 1500, quantity: 20 },
            { id: 3, title: 'Laser Gun', price: 5000, quantity: 80 },
            { id: 4, title: 'Freeze Ray', price: 4500, quantity: 40 },
            { id: 5, title: 'Pulse Riffle', price: 3500, quantity: 30 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (const good of this.goods) {
            const productObject = new ProductItem(good);
            // console.log(productObject);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }


}

class ProductItem {
    constructor(product, img = 'http://via.placeholder.com/200x150') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.title}</h3>
                          <p>${this.price} 	&#65509</p>
                          <input class = "input" type = "number" min = "1" max = "100" value = "1">
                          <button class="buy-btn">Add to cart</button>
                      </div>
                  </div>`;
    }

}

class CartList extends ProductList {
    constructor(container = '.cart') {
        super(container);
    }

    fetchGoods() {
        this.goods = [
            { id: 1, title: 'Neutrino Bomb', price: 20000, quantity: 70 },
            { id: 2, title: 'Chris', price: 1500, quantity: 20 },
            { id: 3, title: 'Laser Gun', price: 5000, quantity: 80 },
            { id: 4, title: 'Freeze Ray', price: 4500, quantity: 40 },
            { id: 5, title: 'Pulse Riffle', price: 3500, quantity: 30 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (const good of this.goods) {
            const productObject = new CartItem(good);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
        }
        this.getTotalQuantity();
        this.getTotalPrice();

    }
    getTotalQuantity() {
        const block = document.querySelector('.quantity')
        let sumQuantity = 0;
        this.goods.forEach(good => { sumQuantity += good.quantity });
        block.insertAdjacentHTML("afterbegin", `Quantity:	&nbsp; ${sumQuantity} pcs.`);
    }
    getTotalPrice() {
        const block = document.querySelector('.total')
        let sum = 0;
        this.goods.forEach(good => { sum += (good.price * good.quantity) });
        block.insertAdjacentHTML("afterbegin", `Total:	&nbsp; ${sum} &#65509`);
    }

}

class CartItem extends ProductItem {
    constructor(product, img = 'http://via.placeholder.com/200x150') {
        super(product);
        this.quantity = product.quantity;

    }

    render() {
        return `<div class="cart-item" data-id="${this.id}">
                      <img src="${this.img}" alt="Some img">
                      <div class="cart-desc">
                          <h3>${this.title}</h3>
                          <p>${this.price} 	&#65509 per 1 item</p>
                          <p>${this.quantity} pcs</p>
                      </div>
                      <input class = "input" type = "number" min = "1" max = "100" value = "${this.quantity}">
                      <button class="buy-btn" id = "delete_btn"> Delete all</button>
                  </div>`;
    }

}

new ProductList();
new CartList();



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
