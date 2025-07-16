export const cart = [];

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
            quantity: 1
        })
    }
}