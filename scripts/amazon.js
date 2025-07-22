// import variables and functions
import {cart, addToCart, calculateCartQuantity} from '../data/cart.js'
import {products, loadProducts} from '../data/products.js'
import {formatCurrency} from './utils/money.js'

loadProducts(renderProductsGrid)

function renderProductsGrid () {

    // generate HTML for products
    let productsHTML = ``
    products.forEach(product => {
        productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                         src="${product.image}"/>
                </div>
            
                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>
            
                <div class="product-rating-container">
                    <img class="product-rating-stars"
                         src="${product.getStarsUrl()}"/>
                    <div class="product-rating-count link-primary">
                        ${product.rating.count}
                    </div>
                </div>
            
                <div class="product-price">
                    ${product.getPrice()}
                </div>
            
                <div class="product-quantity-container">
                    <select class="js-quantity-selector-${product.id}" name="js-quantity-selector-${product.id}">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                
                ${product.extraInfoHTML()}
            
                <div class="product-spacer"></div>
            
                <div class="added-to-cart js-added-to-cart-button-${product.id}">
                    <img src="images/icons/checkmark.png"/>
                    Added
                </div>
            
                <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `
    })

    // load productsListHTML in amazon page
    document.querySelector('.js-products-grid').innerHTML = productsHTML;

    // object to save timeout ids
    const timeoutIds = {}

    // update cart quantity
    function updateCartQuantity() {
        document.querySelector('.js-cart-quantity').innerText = calculateCartQuantity()
    }
    updateCartQuantity()

    // add to Cart event listener
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', () => {
            const {productId} = button.dataset
            const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
            addToCart(productId, quantity)
            updateCartQuantity()
            showAddedToCartMessage(productId)
            console.log(cart, quantity)
        })
    })

    function showAddedToCartMessage(productId) {
        const addedToCartButton = document.querySelector(`.js-added-to-cart-button-${productId}`)
        addedToCartButton.classList.add('visible')
        if (timeoutIds[productId]) {
            clearTimeout(timeoutIds[productId])
            delete timeoutIds[productId]
        }
        timeoutIds[productId] = setTimeout(() => {
            addedToCartButton.classList.remove('visible')
            delete timeoutIds[productId]
        }, 2000)
    }
}