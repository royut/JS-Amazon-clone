import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
    beforeEach(() => {
        // set up a test environment
        spyOn(localStorage, 'setItem')
        document.querySelector('.js-test-container').innerHTML = `
            <div class="order-summary"></div>
            <div class="payment-summary"></div>
        `
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 2,
                    deliveryOptionId: '1'
                }
            ])
        })
        loadFromStorage()

        renderOrderSummary()
    })
    // test: how the page looks
    it('displays the cart', () => {
        // tests
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2)
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 1')
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 2')
        // clear the page
        document.querySelector('.js-test-container').innerHTML = ''
    })
    // test: how the page behaves
    it('removes a product from the cart', () => {
        // delete one item
        document.querySelector(`.js-delete-link-${productId1}`).click()
        // tests
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
        // clear the page
        document.querySelector('.js-test-container').innerHTML = ''
    })
})