import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
];

export function getDeliveryOption (deliveryOptionId) {
    let matchingDeliveryOption
    deliveryOptions.forEach(deliveryOption => {
        if (deliveryOption.id === deliveryOptionId) {
            matchingDeliveryOption = deliveryOption
        }
    })
    return matchingDeliveryOption || deliveryOptions[0]
}

export function calculateDeliveryDateString(deliveryOptionId) {
    let matchingDeliveryOption
    deliveryOptions.forEach(deliveryOption => {
        if (deliveryOption.id === deliveryOptionId) {
            matchingDeliveryOption = deliveryOption
        }
    })
    let today = dayjs()
    let deliveryDate = today.add(matchingDeliveryOption.deliveryDays, 'days')
    if (deliveryDate.day() === 6) {
        return deliveryDate.add('2', 'days').format('dddd, MMMM D')
    }
    else if (deliveryDate.day() === 0) {
        return deliveryDate.add('1', 'days').format('dddd, MMMM D')
    }
    return deliveryDate.format('dddd, MMMM D')
}