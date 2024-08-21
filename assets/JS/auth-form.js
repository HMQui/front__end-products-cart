// Display auth-form
var getConfirm = document.querySelector('.cart-filled__confirm');
var getAuthForm = document.querySelector('.auth-form');
var getNewOrder = document.querySelector('.auth-form__start-order');

// Fucntion to display order products
function displayOrderedProducts() {
    var getList = document.querySelector('.auth-form__list');
    var html = '';
    var listLength = listAmount.length;

    for (var i = 0; i < listLength; i++) {
        if (listAmount[i] > 0) {
            var img = listProducts[i].img;
            html += 
            `<li class="auth-form__items">
                <img src="${img}" alt="" class="img-thumbnail">
                <div class="auth-form__items-detail">
                <p class="auth-form__items-name">${listProducts[i].name}</p>
                <div class="auth-form__items-amount-price">
                    <p class="auth-form__items-amount">${listAmount[i]}x</p>
                    <p class="auth-form__items-price">@ $${listProducts[i].price}</p>
                </div>
                </div>
                <p class="auth-form__items-total-price">$${listAmount[i] * listProducts[i].price}</p>
            </li>`
        }
    }

    getList.innerHTML = html;

    var totalPrice = 0;
    listAmount.forEach(function(val, i) {
        totalPrice += val * listProducts[i].price;
    })
    
    document.querySelector('.auth-form__total-price').innerHTML = `$${totalPrice}`
}

// Handle auth form
function handleAuthForm(event) {
    // Display auth form on
    getAuthForm.classList.toggle('display-flex');

    // Display ordered product(s)
    displayOrderedProducts();

    // 
}

// Handle get new order
function handleGetNewOrder(event) {
    // Display auth form, cart empty, cart-filled
    getAuthForm.classList.toggle('display-flex');
    document.querySelector('.cart-empty').classList.toggle('display-flex');
    document.querySelector('.cart-filled').classList.remove('display-flex');
    document.querySelector('.cart-filled').classList.add('display-none');

    // Update list amount and total amount
    totalAmount = 0;
    listAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Restet amount
    document.querySelectorAll('.menu-list__item-add-to-cart-amount').forEach(function(item) {
        item.innerHTML = 0;
    })

    // Reset cart filled
    document.querySelector('.cart-filled__list').innerHTML = '';
}

// Display flex for auth form when click confirm
getConfirm.addEventListener('click', handleAuthForm);

// Display none for auth form
getAuthForm.onclick = function(event) {
    getAuthForm.classList.toggle('display-flex');
};
document.querySelector('.container').onclick = function(event) {
    event.stopPropagation();
};

getNewOrder.addEventListener('click', handleGetNewOrder);