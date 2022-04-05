export const PizzaTemplate = {
    id: '',
    ingredients: [],

    getData:          () => ({}),
    updateIngredient: (ingredient, position) => true,

    // removed
    getDescription:  () => ({}),
    getIngredients:   () => [{}],
    getSellingPrice:  () => 0,
    ingredientRemove: (ingredient) => true,
    ingredientAdd:    (ingredient, position) => true,
    ingredientUpdate: (ingredient, position) => true,
};

export const Pizza = function (seed) {
    Object.assign(this, PizzaTemplate, seed);

    this.getData = function () {
        return {
            group: 'pizzas',
            id: this.id,
            ingredients: this.ingredients,
        };
    };

    this.getDescription = function () {
        return {
            type: 'pizza',
            name: this.id,
            ingredients: this.ingredients,
        };
    };

    this.getIngredients = async function () {
        return this.ingredients;
    };

    this.getSellingPrice = function () {
        const priceModificator = price => price * 1.5;
        const priceCounter = (ingredient, total) => total + ingredient.price;
        const baseCost = this.getIngredients().reduce(priceCounter, 0);
        return priceModificator(baseCost);
    };

    this.updateIngredient = function (ingredient, layer = 1) {
        const list  = this.ingredients;
        const index = list.indexOf(ingredient);
        const exist = index > -1;
        const keep  = layer > 0;
        if (exist) list.splice(index, 1);
        if (keep)  list.splice(--layer, 0, ingredient);
    };

    // ingredients operations

    const updateList = (list, item, position = 1) => {
        const index = list.indexOf(item);
        const exist = index > -1;
        const keep  = position > 0;
        if (exist) list.splice(index, 1);
        if (keep)  list.splice(--position, 0, item);
        return list;
    };

    this.ingredientRemove = function (ingredient) {
        updateList(
            this.ingredients,
            ingredient.id,
            0,
        );
    };

    this.ingredientAdd = function (ingredient, position) {
        updateList(
            this.ingredients,
            ingredient.id,
            position,
        );
    };

    this.ingredientUpdate = this.ingredientAdd;

};

export const PizzaIngredientTemplate = {
    id: '',
    title: '',
    price: 0,
    read: ingredient => ({}),
    getDescription: () => ({}),
};
