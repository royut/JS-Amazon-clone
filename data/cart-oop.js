function Cart(locaStorageKey) {

    const cart = {
        cartItems: undefined,
        // load from local storage
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(locaStorageKey)) || []
        },
        // save to local storage
        saveToLocalStorage() {
            localStorage.setItem(locaStorageKey, JSON.stringify(this.cartItems))
        },
        // add product to the cart
        addToCart(productId) {
            let mathingItem
            this.cartItems.forEach(cartItem => {
                if (cartItem.productId === productId) {
                    mathingItem = cartItem
                }
            })
            if (mathingItem) {
                mathingItem.quantity += 1
            } else {
                this.cartItems.push({
                    productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                })
            }
            this.saveToLocalStorage()
        },
        // remove product from the cart
        removeFromCart(productId) {
            this.cartItems.forEach((cartItem, index) => {
                if (cartItem.productId === productId) {
                    this.cartItems.splice(index, 1)
                }
            })
            this.saveToLocalStorage()
        },
        // update delivery option
        updateDeliveryOption(productId, newDeliveryOptionId) {
            this.cartItems.forEach(cartItem => {
                if (cartItem.productId === productId) {
                    cartItem.deliveryOptionId = newDeliveryOptionId
                }
            })
            this.saveToLocalStorage()
        }
    }
    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business')

cart.loadFromStorage()
cart.loadFromStorage()
businessCart.loadFromStorage()

console.log(cart)
console.log(businessCart)