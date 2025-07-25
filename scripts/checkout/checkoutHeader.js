import {calculateCartQuantity} from '../../data/cart.js'

export function renderCheckoutHeader() {
    // load checkout header into page
    document.querySelector('.checkout-header').innerHTML = `
        <div class="header-content">
            <div class="checkout-header-left-section">
                <a href="amazon.html">
                    <img class="amazon-logo" src="images/amazon-logo.png" alt="Amazon">
                    <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png" alt="Amazon">
                </a>
            </div>
            <div class="checkout-header-middle-section">
                Checkout (<a class="return-to-home-link js-return-to-home-link" href="amazon.html">${calculateCartQuantity()} Items</a>)
            </div>
            <div class="checkout-header-right-section">
                <img src="images/icons/checkout-lock-icon.png" alt="Checkout">
            </div>
        </div>
    `
}