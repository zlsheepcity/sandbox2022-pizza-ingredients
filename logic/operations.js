// Supported operations

const utils = require("utils");

module.exports = {

    readIngredients:
    function () {
        return {
            collection: 'Ingredients',
            errorMsg: 'Error fetching ingredients',
        };
    },

    readPizzas:
    function () {
        return {
            collection: 'Pizzas',
            errorMsg: 'Error fetching pizzas',
        };
    },

    readPizzaById:
    function (pizzaId) {
        return {
            documentId: pizzaId,
            collection: 'Pizzas',
            errorMsg: `Error fetching pizza with id:${pizzaId}`,
        };
    },

    addIngredientToPizza:
    function (pizzaId, ingredientId, layerPosition) {
        return {
            documentId: pizzaId,
            collection: 'Pizzas',
            field: 'ingredients',
            update: function (currentLayers) {
                return utils.updateList(
                    currentLayers,
                    ingredientId,
                    layerPosition
                );
            },
            errorMsg: `Error updating pizza with id:${pizzaId}`,
        };
    },

    removeIngredientFromPizza:
    function (pizzaId, ingredientId) {
        return {
            documentId: pizzaId,
            collection: 'Pizzas',
            field: 'ingredients',
            update: function (currentLayers) {
                return utils.updateList(
                    currentLayers,
                    ingredientId,
                    0
                );
            },
            errorMsg: `Error updating pizza with id:${pizzaId}`,
        };
    },

    reorderIngredientInPizza:
    function (pizzaId, ingredientId, layerPosition) {
        return {
            documentId: pizzaId,
            collection: 'Pizzas',
            field: 'ingredients',
            update: function (currentLayers) {
                return utils.updateList(
                    currentLayers,
                    ingredientId,
                    layerPosition
                );
            },
            errorMsg: `Error updating pizza with id:${pizzaId}`,
        };
    },

};
