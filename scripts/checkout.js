import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFetch} from "../data/products.js";
import {loadCart} from "../data/cart.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js'


async function loadPage() {
    try {
        await loadProductsFetch()
        await new Promise((resolve, reject) => {
            // throw 'error2'
            loadCart(() => {
                // reject('error')
                console.log("loading useless shit")
                resolve('value3')
            })
        })
    } catch (error) {
        console.log('error in async await')
        console.log(error)
    }

    renderOrderSummary()
    renderPaymentSummary()
}
loadPage();

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve('value2')
//         })
//     })
// ]).then((values) => {
//     console.log(values)
//     renderOrderSummary()
//     renderPaymentSummary()
// })

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('value1')
//     })
//
// }).then((value) => {
//     console.log(value)
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve('value2')
//         })
//     })
//
// }).then((value) => {
//     console.log(value)
//     renderOrderSummary();
//     renderPaymentSummary();
// })

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     })
// });
