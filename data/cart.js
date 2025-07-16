export const cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 23
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2
    }
];

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

// remove product from the cart
export function removeFromCart (productId) {
    cart.forEach((cartItem, index) => {
        if (cartItem.productId === productId) {
            cart.splice(index, 1)
        }
    })
}