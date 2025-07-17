export const cart = JSON.parse(localStorage.getItem('cart')) || []

// save to local storage
function saveToLocalStorage () {
    localStorage.setItem('cart', JSON.stringify(cart))
}

// add product to the cart
export function addToCart (productId) {
    let mathingItem
    cart.forEach(cartItem => {
        if (cartItem.productId === productId) {
            mathingItem = cartItem
        }
    })
    if (mathingItem) {
        mathingItem.quantity += 1
    }
    else {
        cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: '1'
        })
    }
    saveToLocalStorage()
}

// remove product from the cart
export function removeFromCart (productId) {
    cart.forEach((cartItem, index) => {
        if (cartItem.productId === productId) {
            cart.splice(index, 1)
        }
    })
    saveToLocalStorage()
}