// import variables and functions
import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js'
import {getProduct} from '../../data/products.js'
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'
import {formatCurrency} from '../utils/money.js'
import {renderPaymentSummary} from './paymentSummary.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'


export function renderOrderSummary () {
    // generate HTML for cart
    let cartSummaryHTML = ``
    cart.forEach(cartItem => {
        let product = getProduct(cartItem.productId)
        let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
                <div class="delivery-date">
                    Delivery date: ${dayjs().add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D')}
                </div>
                <div class="cart-item-details-grid">
                    <img class="product-image" src="${product.image}">
                    <div class="cart-item-details">
                        <div class="product-name">
                            ${product.name}
                        </div>
                        <div class="product-price">
                            $${formatCurrency(product.priceCents)}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                                Update
                            </span>
                            <span class="delete-quantity-link link-primary" data-product-id="${cartItem.productId}">
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
        const today = dayjs()
        deliveryOptions.forEach(deliveryOption => {
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
            const dateString = deliveryDate.format('dddd, MMMM D')
            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : ''
            html += `
                <div class="delivery-option" data-product-id="${cartItem.productId}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" class="delivery-option-input" name="delivery-option-${cartItem.productId}" ${isChecked}>
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
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
    document.querySelectorAll('.delete-quantity-link').forEach(link => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId
            removeFromCart(productId)
            renderOrderSummary()
            renderPaymentSummary()
        })
    })

    // update delivery option event listener
    document.querySelectorAll('.delivery-option').forEach(element => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset
            updateDeliveryOption(productId, deliveryOptionId)
            renderOrderSummary()
            renderPaymentSummary()
        })
    })
}