// Get elements from the DOM
var getCartEmpty = document.querySelector('.cart-empty');
var getCartFilled = document.querySelector('.cart-filled');
var getIncrease = document.querySelectorAll('.increment-button');
var getDecrease = document.querySelectorAll('.decrement-button');

// Local memory
let totalAmount = 0;
let listAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let listProducts = 
    [
        {
          "id": "0",
          "name": "Waffle with Berries",
          "amount": 53,
          "price": 6.5,
          "img": "./assets/images/image-waffle-thumbnail.jpg"
        },
        {
          "id": "1",
          "name": "Classic Tiramisu",
          "amount": 0,
          "price": 5.5,
          "img": "./assets/images/image-tiramisu-thumbnail.jpg"
        },
        {
          "id": "2",
          "name": "Red Velvet Cake",
          "amount": 0,
          "price": 4.5,
          "img": "./assets/images/image-cake-thumbnail.jpg"
        },
        {
          "id": "3",
          "name": "Vanilla Bean Creme Brulee",
          "amount": 0,
          "price": 7,
          "img": "./assets/images/image-creme-brulee-thumbnail.jpg"
        },
        {
          "id": "4",
          "name": "Pistachio Baklava",
          "amount": 0,
          "price": 4,
          "img": "./assets/images/image-baklava-thumbnail.jpg"
        },
        {
          "id": "5",
          "name": "Salted Caramel Brownie",
          "amount": 0,
          "price": 5.5,
          "img": "./assets/images/image-brownie-thumbnail.jpg"
        },
        {
          "id": "6",
          "name": "Macaron Mix of Five",
          "amount": 0,
          "price": 8,
          "img": "./assets/images/image-macaron-thumbnail.jpg"
        },
        {
          "id": "7",
          "name": "Lemon Meringue Pie",
          "amount": 0,
          "price": 8,
          "img": "./assets/images/image-meringue-thumbnail.jpg"
        },
        {
          "id": "8",
          "name": "Vanilla Panna Cotta",
          "amount": 0,
          "price": 6.5,
          "img": "./assets/images/image-panna-cotta-thumbnail.jpg"
        }
      ];

// fetch("http://localhost:3000/products") --> test api rest
//     .then(responsive => responsive.json())
//     .then(data => listProducts = data)

// Function to update the displayed amount in the UI
function displayAmount(id) {
    var getItemAmount = document.getElementById(`${id}`).querySelector('.menu-list__item-add-to-cart-amount');
    getItemAmount.innerHTML = listAmount[id];
}

// Function to handle cart visibility based on total amount
function updateCartVisibility() {
    if (totalAmount === 0) {
        getCartEmpty.classList.add('display-flex');
        getCartEmpty.classList.remove('display-none');

        getCartFilled.classList.add('display-none');
        getCartFilled.classList.remove('display-flex');
    } else {
        getCartEmpty.classList.add('display-none');
        getCartEmpty.classList.remove('display-flex');

        getCartFilled.classList.remove('display-none');
        getCartFilled.classList.add('display-flex');
    }
}

// Function to update cart amount
function updateCartAmount(id, add) {
    var getItemById = document.getElementById(`${id}`)

    var listLength = listAmount.length;

    if (listAmount[id] > 0 && listAmount[id] != 1 && add === true) {
        var getUpdateItemById = document.getElementById(`product-filled-${id}`);
        getUpdateItemById.querySelector(".cart-filled__item-amount").innerHTML = listAmount[id] + "x";
        getUpdateItemById.querySelector(".cart-filled__item-total-price").innerHTML = "$" + listAmount[id] * listProducts[id].price;
    }
    else if (listAmount[id] === 1 && add === true) {
        var html = 
        `<li class="cart-filled__item" id="product-filled-${id}">
            <div class="cart-filled__item-content">
                <h6 class="cart-filled__item-title">${listProducts[id].name}</h6>
                <div class="cart-fille__item-detail">
                    <p class="cart-filled__item-amount">${listAmount[id]}x</p>
                    <p class="cart-filled__item-price">@ $${listProducts[id].price}</p>
                    <p class="cart-filled__item-total-price">$${listAmount[id] * listProducts[id].price}</p>
                </div>
            </div>
            <button class="cart-filled__item-cancel" style="background-image: url('./assets/images/icon-remove-item.svg');"></button>
        </li>`;
        document.querySelector(".cart-filled__list").innerHTML += html;
    }
    else if (add === false && listAmount[id] > 0) {
        var getUpdateItemById = document.getElementById(`product-filled-${id}`);
        getUpdateItemById.querySelector(".cart-filled__item-amount").innerHTML = listAmount[id] + "x";
        getUpdateItemById.querySelector(".cart-filled__item-total-price").innerHTML = "$" + listAmount[id] * listProducts[id].price;
    }
    else if (add === false && listAmount[id] === 0) {
        var getUpdateItemById = document.getElementById(`product-filled-${id}`);
        if (getUpdateItemById) {
            getUpdateItemById.remove();
        }
    }

    document.querySelector('.cart-filled__title').innerHTML = `Your Cart (${totalAmount})`

    var totalPrice = 0;
    listAmount.forEach(function(val, i) {
        totalPrice += val * listProducts[i].price;
    })
    
    document.querySelector('.cart-filled__total-price').innerHTML = `$${totalPrice}`
}

// Function to remove item from cart
function handleRemoveItem() {
    var getParent = this.closest('.cart-filled__item');
    var str = getParent.getAttribute('id');
    var parts = str.split("-");
    var itemId = parts[parts.length - 1];

    // Update total amount and list amount
    totalAmount -= listAmount[itemId];
    listAmount[itemId] = 0;

    // Display remove
    var getUpdateItemById = document.getElementById(`product-filled-${itemId}`);
    if (getUpdateItemById) {
        getUpdateItemById.remove();
    }

    // Display visibility for cart
    updateCartVisibility();

    // Display amount
    displayAmount(itemId);

    // Update diplay title total
    document.querySelector('.cart-filled__title').innerHTML = `Your Cart (${totalAmount})`
}

// Increase amount handler
function increaseAmount() {
    // Get id
    var parentItem = this.closest('.menu-list__item');
    var itemId = parseInt(parentItem.getAttribute('id'));

    // Update total amount
    totalAmount++;

    // Update list amount
    listAmount[itemId]++;

    // Update cart visibility
    updateCartVisibility();

    // Display amount
    displayAmount(itemId);

    // Update cart amount
    updateCartAmount(itemId, true);

    // Remove item
    document.querySelectorAll('.cart-filled__item-cancel').forEach(function(button) {
        button.addEventListener('click', handleRemoveItem);
    })

}

// Decrease amount handler
function decreaseAmount() {
    // Get id
    var parentItem = this.closest('.menu-list__item');
    var itemId = parseInt(parentItem.getAttribute('id'));

    if (listAmount[itemId] > 0) {
        // Update total amount
        totalAmount--;

        // Update list amount
        listAmount[itemId]--;

        // Update cart visibility
        updateCartVisibility();

        // Display amount
        displayAmount(itemId);

        // Update cart amount
        updateCartAmount(itemId, false);
    }
}

// Add event listeners to buttons
getIncrease.forEach(function(button) {
    button.addEventListener('click', increaseAmount);
});

getDecrease.forEach(function(button) {
    button.addEventListener('click', decreaseAmount);
});
