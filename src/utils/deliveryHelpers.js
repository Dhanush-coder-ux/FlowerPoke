export const DELIVERY_OPTIONS = [
  { val: "standard", label: "⚡ Same-Day", priceLabel: "Free", price: 0 },
  { val: "express", label: "🚀 2-Hour", priceLabel: "₹99", price: 99 },
  { val: "midnight", label: "🌙 Midnight", priceLabel: "₹149", price: 149 },
];

export function getDeliveryCost(type) {
  const option = DELIVERY_OPTIONS.find((opt) => opt.val === type);
  return option ? option.price : 0;
}
