import {getProduct, loadProductsFetch} from "../../data/products.js";
import {loadFromStorage} from "../../data/cart.js";
import {renderPaymentSummary} from "../../scripts/checkout/paymentSummary.js";
import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js";

describe('test suite: renderPaymentSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done()
        })
    })

    beforeEach(() => {
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
                    quantity: 3,
                    deliveryOptionId: '2'
                }
            ])
        })
        loadFromStorage()
        renderOrderSummary()
        renderPaymentSummary()
    })

    afterEach(() => {
        // clear the page
        document.querySelector('.js-test-container').innerHTML = ''
    })

    it('removing a product from the cart', () => {
        // delete one item
        document.querySelector(`.js-delete-link-${productId1}`).click()
        let item2 = getProduct(productId2)
        // tests-simple
        expect(
            document.querySelector('.total-product-price').innerText
        ).toEqual(`$${(item2.priceCents * 3) / 100}`)
    })

    it('changes the quantity of a product', () => {
        // change quantity of one item
        document.querySelector(`.js-update-link-${productId1}`).click()
        document.querySelector(`.js-quantity-input-${productId1}`).value = 10
        document.querySelector(`.js-save-link-${productId1}`).click()
        let item1 = getProduct(productId1)
        let item2 = getProduct(productId2)
        // tests-simple
        expect(
            document.querySelector('.total-product-price').innerText
        ).toEqual(`$${((item1.priceCents * 10) + (item2.priceCents * 3)) / 100}`)
    })
})