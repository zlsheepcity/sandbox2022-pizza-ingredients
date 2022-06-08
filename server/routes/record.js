const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");

const operations = require("../../logic/operations");
const options = {}//;{ projection: {_id:0} };

recordRoutes.route("/").get(async function (req, res) {
    const allRoutes = [
        '/Ingredients',
        '/Pizzas',
        '/Pizza/6260f85c62653e74bf2396f4',
        '/Pizza/6260f8da62653e74bf2396f5',
        '/pizza/1001',
        '/pizza/1002',
    ];
    const toHtmlLink = o => `<li><a href="${o}">${o}</a>`;
    res.send(`
        <title>Pizza:server</title>
        <ul>${allRoutes.map(toHtmlLink).join('')}</ul>
    `);
});

const mongo = require('mongodb');

const DB = {
    ObjectID: id => mongo.ObjectID(id),
    readList: ({collection, query, run}) => {
        const dbConnect = dbo.getDb();
        dbConnect
            .collection(collection)
            .find(query, options)
            .limit(50)
            .toArray( (err, list) => run(list) )
    },
    readItem: ({collection, query, run}) => {
        const dbConnect = dbo.getDb();
        dbConnect
            .collection(collection)
            .findOne(query, options)
            .then(run);
    },
    updateDocument: ({document, collection, run}) => {
        const { _id, ...doc } = document
        const dbConnect = dbo.getDb();
        dbConnect
            .collection(collection)
            .updateOne({'_id':mongo.ObjectID(_id)}, doc);
    },
};
//const updateShortcut = (op, req, res) => {
//    const dbConnect = dbo.getDb();
//    const findQuery = { _id: op.documentId };
//    const updateDocument = doc =>
//        dbConnect
//            .collection(op.collection)
//            .updateOne(
//                findQuery,
//                { [op.field]: op.update(doc[op.field]) }
//            );
//    dbConnect
//        .collection(op.collection)
//        .findOne(findQuery)
//        .then(updateDocument);
//}
const Cook = async ({ pizza, delivery }) => {
    const getSellingPrice = ({Ingredients}) => {
        const summ = Ingredients.reduce((a,b) => a+b.price *100, 0);
        const modifyer = x => x*1.5 /100;
        return modifyer(summ);
    }
    const expandIngredients = Ingredients => delivery({
        ...pizza,
        Ingredients,
        sellingPrice: getSellingPrice({Ingredients}),
    });
    const collection = 'Ingredients';
    const query = { name: { $in: pizza[collection] } };
    await DB.readList({collection, query, run: expandIngredients});
};

recordRoutes.route("/Ingredients").get(
    async function (req, res) {
        await DB.readList({
            collection: 'Ingredients',
            query: {},
            run: o => res.json(o),
        });
    }
);

recordRoutes.route("/Pizzas").get(
    async function (req, res) {
        await DB.readList({
            collection: 'Pizzas',
            query: {},
            run: o => res.json(o),
        });
    }
);

recordRoutes.route("/Pizza/:id").get(
    async function (req, res) {
        await DB.readItem({
            collection: 'Pizzas',
            query: { '_id': DB.ObjectID(req.params.id) },
            run: pizza => pizza
                 ? Cook({ pizza, delivery: o=>res.json(o) })
                 : res.status(400).send('Not found'),
        });
    }
);



recordRoutes.route("/Pizza/:id/AddIngredient").post(
    async function (req, res) {
        console.log('zzzz')
        DB.updateDocument({
            collection: 'Pizzas',
            document: {
                '_id': req.params.id,
                name: 'MacDac Pizza.',
            },
            run: o => false,
        });
//        const op = operations.addIngredientToPizza(
//            req.body.pizzaId,       // ObjectId
//            req.body.ingredientId,  // ObjectId
//            req.body.position       // Number
//        );
//        updateShortcut(op, req, res);
    }
);


// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Read

const readAllShortcut = (op, req, res) => {
    const dbConnect = dbo.getDb();
    const action = function (err, result) {
        if (err) res.status(400).send(op.errorMsg);
        else res.json(result);
    };
    dbConnect
        .collection(op.collection)
        .find({}, options).limit(50)
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

recordRoutes.route("/pizza/:pizzaId").get(async function (req, res) {
    const op = operations.readPizzaById(req.params.pizzaId);

    const dbConnect = dbo.getDb();
    const findQuery = { id: op.documentId };
    //const findQuery = { id: { $in: ['1002'] } };
    const action = doc => res.json(doc);
    const toArrayAction = function (err, result) {
        if (err) res.status(400).send(op.errorMsg);
        else res.json(result);
    };
    const pizzator = doc => {
        const findQuery = { name: { $in: doc.ingredients } };

        const expandIngredients = (err, list) => {
            console.log('expandIngredients', list)
            const ingredients = list.map(o=>({
                name: o.name,
                price: o.price,
            }))
            const sellingPrice = ingredients.reduce((a,b)=>a+b.price, 0)
            res.json({
                ...doc,
                ingredients,
                sellingPrice,
            });
        }
        return dbConnect
            .collection(op.subCollection)
            .find(findQuery, {
                projection: {_id:0},
                sort: {price:1},
            }).limit(50)
            .toArray(expandIngredients);
            //.toArray(toArrayAction);
    }

    const subDocuments = doc => {
    dbConnect
        .collection(op.subCollection)
        .find({}, ).limit(50)
        .then();
    }



    dbConnect
        .collection(op.collection)
        .findOne(findQuery, { projection: {_id:0} })
        .then(pizzator);
        //.then(action);

        //.find(findQuery).limit(50)
        //.toArray()
        //.then(doc => res.json(doc));
        //.then(action);

});
//recordRoutes.route("/pizza").get(async function (req, res) {
//    const op = operations.readPizzaById(
//        req.body.pizzaId // ObjectId
//    );
//
//    const dbConnect = dbo.getDb();
//    const findQuery = { _id: op.documentId };
//    const action = function (err, result) {
//        if (err) res.status(400).send(op.errorMsg);
//        else res.json(result);
//    };
//    const subDocuments = doc => {
//    dbConnect
//        .collection(op.subCollection)
//        .find({}).limit(50)
//        .then();
//    }
//
//
//
//    dbConnect
//        .collection(op.collection)
//        .findOne(findQuery)
//        .toArray(action);
//});

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
