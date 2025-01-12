export const deliveryOptions = [
  {
    deliveryOptionId: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    deliveryOptionId: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    deliveryOptionId: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(id) {
  let matchingOption;

  deliveryOptions.forEach((option) => {
    if (id === option.deliveryOptionId) {
      matchingOption = option;
    }
  });

  return matchingOption;
}
