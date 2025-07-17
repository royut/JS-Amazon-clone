export function formatCurrency(priceCents) {
    return Math.round(Number(priceCents / 100)).toFixed(2)
}