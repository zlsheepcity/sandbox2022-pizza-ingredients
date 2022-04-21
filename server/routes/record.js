const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");

const operations = require("../../logic/operations");

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Read

const readAllShortcut = (op, req, res) => {
    const dbConnect = dbo.getDb();
    const action = function (err, result) {
        if (err) res.status(400).send(op.errorMsg);
        else res.json(result);
    };
    dbConnect
        .collection(op.collection)
        .find({}).limit(50)
        .toArray(action);
};

recordRoutes.route("/ingredients").get(async function (req, res) {
    const op = operations.readIngredients();
    readAllShortcut(op, req, res)
});

recordRoutes.route("/pizzas").get(async function (req, res) {
    const op = operations.readPizzas();
    readAllShortcut(op, req, res)
});

recordRoutes.route("/pizza").get(async function (req, res) {
    const op = operations.readPizzaById(
        req.body.pizzaId // ObjectId
    );

    const dbConnect = dbo.getDb();
    const findQuery = { _id: op.documentId };
    const action = function (err, result) {
        if (err) res.status(400).send(op.errorMsg);
        else res.json(result);
    };
    dbConnect
        .collection(op.collection)
        .findOne(findQuery)
        .toArray(action);
});

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Update

const updateShortcut = (op, req, res) => {
    const dbConnect = dbo.getDb();
    const findQuery = { _id: op.documentId };
    const updateDocument = doc =>
        dbConnect
            .collection(op.collection)
            .updateOne(
                findQuery,
                { [op.field]: op.update(doc[op.field]) }
            );
    dbConnect
        .collection(op.collection)
        .findOne(findQuery)
        .then(updateDocument);
}

recordRoutes.route("/pizza/addIngredient").post(function (req, res) {
    const op = operations.addIngredientToPizza(
        req.body.pizzaId,       // ObjectId
        req.body.ingredientId,  // ObjectId
        req.body.position       // Number
    );
    updateShortcut(op, req, res);
});

recordRoutes.route("/pizza/removeIngredient").post(function (req, res) {
    const op = operations.removeIngredientFromPizza(
        req.body.pizzaId,       // ObjectId
        req.body.ingredientId   // ObjectId
    );
    updateShortcut(op, req, res);
});

recordRoutes.route("/pizza/reorderIngredient").post(function (req, res) {
    const op = operations.reorderIngredientInPizza(
        req.body.pizzaId,       // ObjectId
        req.body.ingredientId,  // ObjectId
        req.body.position       // Number
    );
    updateShortcut(op, req, res);
});

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

module.exports = recordRoutes;
