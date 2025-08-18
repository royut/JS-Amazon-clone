import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';
import {getProduct, loadProducts, loadProductsFetch} from '../../data/products.js';

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done()
        })
    })

    beforeEach(() => {
        // set up a test environment
        spyOn(localStorage, 'setItem')
        document.querySelector('.js-test-container').innerHTML = `
            <div class="checkout-header"></div>
            <div class="order-summary"></div>
            <div class="payment-summary"></div>
        `
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: productId2,
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ])
        })
        loadFromStorage()
        renderOrderSummary()
    })

    afterEach(() => {
        // clear the page
        document.querySelector('.js-test-container').innerHTML = ''
    })

    // test: how the page looks
    it('displays the cart', () => {
        // tests-simple
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2)
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2')
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1')
        expect(
            document.querySelector(`.js-cart-item-container-${productId1} > .cart-item-details-grid > .cart-item-details > .product-name`).innerText
        ).toEqual(getProduct(productId1).name)
        expect(
            document.querySelector(`.js-cart-item-container-${productId2} > .cart-item-details-grid > .cart-item-details > .product-name`).innerText
        ).toEqual(getProduct(productId2).name)
        expect(
            document.querySelector(`.js-cart-item-container-${productId1} > .cart-item-details-grid > .cart-item-details > .product-price`).innerText[0]
        ).toBe('$')
        expect(
            document.querySelector(`.js-cart-item-container-${productId2} > .cart-item-details-grid > .cart-item-details > .product-price`).innerText[0]
        ).toBe('$')
    })
    // test: how the page behaves
    it('removes a product from the cart', () => {
        // delete one item
        document.querySelector(`.js-delete-link-${productId1}`).click()
        // tests-simple
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1)
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null)
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null)
        expect(cart.length).toEqual(1)
        expect(cart[0].productId).toEqual(productId2)
    })
    // test changing delivery option
    it('changes delivery option', () => {
        // change delivery option
        document.querySelector(`[data-product-id=${productId1}][data-delivery-option-id="3"]`).click()
        // tests-simple
        expect(
            document.querySelector(`.delivery-option-input[data-delivery-option-id="3"]`).checked
        ).toEqual(true)
        expect(cart.length).toEqual(2)
        expect(cart[0].deliveryOptionId).toEqual('3')
        console.log(cart)
        expect(
            document.querySelector(`.shipping-price`).innerText
        ).toContain('$14.98')
        expect(
            document.querySelector(`.total-price`).innerText
        ).toContain('$63.50')
    })
})