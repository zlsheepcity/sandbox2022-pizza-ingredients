export const PizzaTemplate = {
    id: '',
    title: '',
    ingredients: [],

    create: pizza => true,
    read:   pizza => ({}),
    update: pizza => true,
    delete: pizza => true,

    getDescription:  () => ({}),
    getIngredients:  () => [{}],
    getSellingPrice: () => 0,
};

export const PizzaIngredientTemplate = {
    id: '',
    title: '',
    price: 0,
    read: ingredient => ({}),
    getDescription: () => ({}),
};
