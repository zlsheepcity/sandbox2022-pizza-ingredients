import { DM } from "./30--DataMaster.js";
import { Pizza } from "./10--PizzaMaster.js";

export const PizzaReadAll = async function () {
    const data = await DM.api.pizzas.readAll();
    return data;
};

export const IngredientReadAll = async function () {
    const data = await DM.api.ingredients.readAll();
    return data;
};

export const PizzaCreate = async function (pizza) {
    const data = await DM.api.pizzas.create(pizza);
    return data;
};
export const PizzaRead = async function (pizza) {
    const data = await DM.api.pizzas.read(pizza);
    return data;
};

export const IngredientRead = async function (ingredient) {
    const data = await DM.api.ingredients.read(ingredient);
    return data;
};

export const PizzaUpdate = async function (pizza) {
    const data = await DM.api.pizzas.update(pizza);
    return data;
};

export const PizzaDelete = async function (pizza) {
    const data = await DM.api.pizzas.delete(pizza);
    return data;
};

export const PizzaAddIngredient = async function (pizza, ingredient, layer = 1) {
    const CurrentPizza = await DM.api.pizzas.read(pizza);
    const UpdatedPizza = new Pizza(CurrentPizza);
    UpdatedPizza.updateIngredient(ingredient, layer);
    const data = await DM.api.pizzas.update(UpdatedPizza.getData());
    return data;
};

export const PizzaRemoveIngredient = async function (pizza, ingredient) {
    return PizzaAddIngredient(pizza, ingredient, 0);
};

export const PizzaReorderIngredient = async function (pizza, ingredient, layer) {
    return PizzaAddIngredient(pizza, ingredient, layer);
};

export const PizzaReadIngredients = async function (pizza) {
    const CurrentPizza = await DM.api.pizzas.read(pizza);
    const data = [];
    const dataUpdate = async id => { await data.push(DM.api.ingredients.read({id})); };
    CurrentPizza.ingredients.map(dataUpdate);
    return data;
};

export const PizzaReadSellingPrice = async function (pizza) {
    const priceModificator = price => price * 1.5;
    const ingredients = await PizzaReadIngredients(pizza);
    const ingredientsCounter = (summ, ingredient) => summ + ingredient.price;
    const ingredientsCost = ingredients.reduce(ingredientsCounter, 0);
    return priceModificator(ingredientsCost);
};

export const PizzaFullProfile = async function (pizza) {
    const CurrentPizza = await PizzaRead(pizza);
    const ingredients  = await PizzaReadIngredients(pizza);
    const sellingPrice = await PizzaReadSellingPrice(pizza);
    return {
        name: CurrentPizza.id,
        sellingPrice,
        ingredients,
    };
};