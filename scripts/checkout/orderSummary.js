// import variables and functions
import {cart, removeFromCart, updateDeliveryOption, updateProductQuantity} from '../../data/cart.js'
import {getProduct} from '../../data/products.js'
import {deliveryOptions, getDeliveryOption, calculateDeliveryDateString} from '../../data/deliveryOptions.js'
import {formatCurrency} from '../utils/money.js'
import {renderPaymentSummary} from './paymentSummary.js'
import {renderCheckoutHeader} from "./checkoutHeader.js";


export function renderOrderSummary () {
    // generate HTML for cart
    let cartSummaryHTML = ``
    cart.forEach(cartItem => {
        let product = getProduct(cartItem.productId)
        let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container js-cart-item-container-${cartItem.productId}">
                <div class="delivery-date">
                    Delivery date: ${calculateDeliveryDateString(deliveryOption.id)}
                </div>
                <div class="cart-item-details-grid">
                    <img class="product-image" src="${product.image}">
                    <div class="cart-item-details">
                        <div class="product-name">
                            ${product.name}
                        </div>
                        <div class="product-price">
                            ${product.getPrice()}
                        </div>
                        <div class="product-quantity js-product-quantity js-product-quantity-${cartItem.productId}">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-link js-update-link-${cartItem.productId}"
                             data-product-id="${cartItem.productId}">
                                Update
                            </span>
                            <input class="quantity-input js-quantity-input-${cartItem.productId}">
                            <span class="save-quantity-link link-primary js-save-link js-save-link-${cartItem.productId}"
                             data-product-id="${cartItem.productId}">
                                Save
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${cartItem.productId}"
                             data-product-id="${cartItem.productId}">
                                Delete
                            </span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(cartItem)}
                    </div>
                </div>
            </div>
        `
    })

    function deliveryOptionsHTML(cartItem) {
        let html = ``
        deliveryOptions.forEach(deliveryOption => {
            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : ''
            html += `
                <div class="delivery-option" data-product-id="${cartItem.productId}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" class="delivery-option-input" name="delivery-option-${cartItem.productId}" ${isChecked}
                     data-delivery-option-id="${deliveryOption.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${calculateDeliveryDateString(deliveryOption.id)}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} - Shipping
                        </div>
                    </div>
                </div>
            `
        })
        return html
    }

    // load cartHTML in checkout page
    document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

    // delete item event listener
    document.querySelectorAll('.js-delete-link').forEach(link => {
        link.addEventListener('click', () => {
            const {productId} = link.dataset
            removeFromCart(productId)
            renderCheckoutHeader()
            renderOrderSummary()
            renderPaymentSummary()
        })
    })

    // update item event listener
    document.querySelectorAll('.js-update-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.js-product-quantity').forEach(element => {
                element.classList.remove('is-editing-quantity')
            })
            const {productId} = link.dataset
            document.querySelector(`.js-product-quantity-${productId}`).classList.add('is-editing-quantity')
            document.querySelector(`.js-quantity-input-${productId}`).value = cart.find(cartItem => cartItem.productId === productId).quantity
        })
    })

    // save quantity event listener
    document.querySelectorAll('.js-save-link').forEach(link => {
        const {productId} = link.dataset
        link.addEventListener('click', () => {handleUpdateQuantity(link)})
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
        quantityInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleUpdateQuantity(link)
            }
        })
    })
    function handleUpdateQuantity(link) {
        const {productId} = link.dataset
        const quantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
        if (!isNaN(quantity) && 0 < quantity && quantity <= 1000) {
            updateProductQuantity(productId, quantity)
            // document.querySelector(`.js-product-quantity-${productId}`).classList.remove('is-editing-quantity')
            renderCheckoutHeader()
            renderOrderSummary()
            renderPaymentSummary()
        }
        else {
            alert('Please enter a valid quantity')
        }
    }

    // update delivery option event listener
    document.querySelectorAll('.delivery-option').forEach(element => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset
            updateDeliveryOption(productId, deliveryOptionId)
            renderCheckoutHeader()
            renderOrderSummary()
            renderPaymentSummary()
        })
    })
}