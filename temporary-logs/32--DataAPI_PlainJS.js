import { Pizzas, Ingredients } from "./31--DataMock.js";

const indexById = (list, id) => list.findIndex(item => item.id === id);

export const DataAPI_PlainJS = {
    pizzas: {
        readAll: () => Pizzas,
        create: pizza => !!Pizzas.unshift(pizza),
        read:   pizza =>   Pizzas.find(o => o.id === pizza.id),
        update: pizza => !!Pizzas.splice(indexById(Pizzas, pizza.id), 1, pizza),
        delete: pizza => !!Pizzas.splice(indexById(Pizzas, pizza.id), 1),
    },
    ingredients: {
        readAll: () => Ingredients,
        read: ingredient => Ingredients.find(o => o.id === ingredient.id),
    },
}
