import {products} from "./products.js";

export let cart;

loadFromStorage()

export function loadFromStorage () {
    cart = JSON.parse(localStorage.getItem('cart')) || []
}

// save to local storage
function saveToLocalStorage () {
    localStorage.setItem('cart', JSON.stringify(cart))
}

// return cart quantity
export function calculateCartQuantity() {
    let cartQuantity = 0
    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity
    })
    return cartQuantity
}

// add product to the cart
export function addToCart (productId, quantity = 1) {
    loadFromStorage()
    let mathingItem
    cart.forEach(cartItem => {
        if (cartItem.productId === productId) {
            mathingItem = cartItem
        }
    })
    if (mathingItem) {
        mathingItem.quantity += quantity
    }
    else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        })
    }
    saveToLocalStorage()
}

// remove product from the cart
export function removeFromCart (productId) {
    loadFromStorage()
    cart.forEach((cartItem, index) => {
        if (cartItem.productId === productId) {
            cart.splice(index, 1)
        }
    })
    saveToLocalStorage()
}

// update delivery option
export function updateDeliveryOption (productId, newDeliveryOptionId) {
    loadFromStorage()
    let mathingItem = null
    cart.forEach(cartItem => {
        if (cartItem.productId === productId) {
            mathingItem = cartItem
        }
    })
    if (mathingItem) {
        mathingItem.deliveryOptionId = newDeliveryOptionId
        saveToLocalStorage()
    }
}

// update product quantity in cart
export function updateProductQuantity (productId, newQuantity) {
    loadFromStorage()
    cart.forEach(cartItem => {
        if (cartItem.productId === productId){
            cartItem.quantity = newQuantity
        }
    })
    saveToLocalStorage()
}


export function loadCart (fun) {
    const xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
        console.log(xhr.response)
        fun();
    })

    xhr.open('GET', 'https://supersimplebackend.dev/cart')
    xhr.send()
}