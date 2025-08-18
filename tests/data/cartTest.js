import {addToCart, removeFromCart, cart, loadFromStorage, updateDeliveryOption} from '../../data/cart.js';

describe('test suite: cartTest', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem')
    })

    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ])
        })
        loadFromStorage()

        console.log(localStorage.getItem('cart'))
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(2)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }
        ]))
    })

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([])
        })
        loadFromStorage()

        console.log(localStorage.getItem('cart'))
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }
        ]))
    })

    it('remove an existing product from the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ])
        })
        loadFromStorage()

        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(0)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]))
        expect(cart).toEqual([])
    })

    it('remove a non-existing product from the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ])
        })
        loadFromStorage()

        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c7')
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }
        ]))
        expect(cart[0].quantity).toEqual(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    })

    it('update delivery option of existing product', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ])
        })
        loadFromStorage()

        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '2')
        expect(cart.length).toEqual(1)
        expect(cart[0].deliveryOptionId).toEqual('2')
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    })


    it('update delivery option of non existing product', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([])
        })
        loadFromStorage()

        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '2')
        expect(cart.length).toEqual(0)
        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    })
})