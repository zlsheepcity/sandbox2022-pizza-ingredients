# sandbox2022-pizza-ingredients
Test project with express.js and MongoDB.  

### `cd server`
```
npm install
npm start

    [nodemon] starting `node server.js`
    Mongo cloud connected
    Server is running on port: 5000

http://localhost:5000/
```

# Project Task

The application will allow the users to manage a small catalog of pizzas and the ingredients needed to bake them. 
In particular, users must be able to add and remove the ingredients of an existing pizza (and if possible give those ingredients an order of appearance).

- Ingredients (An ingredient has a name and a cost price.)
- Pizzas (A pizza has a name, a selling price and is made from several ingredients)

The selling price of a pizza equals the total of all its ingredients plus 50% ?of the total for the preparation.

## Examples:

### The "MacDac Pizza" is made of the following ingredients:

- tomato ­ 0.5 eur
- sliced mushrooms ­ 0.5 eur
- feta cheese ­ 1.0 eur
- sausages ­ 1.0 eur
- sliced onion ­ 0.5 eur
- mozzarella cheese ­ 0.3 eur
- oregano 2 eur

#### Total Price = 8.7 eur

### The "Lovely Mushroom Pizza" has a layer of mushrooms on top, and is made of these ingredients:

- tomato ­ 0.5 eur
- bacon ­ 1.0 eur
- mozzarella cheese ­ 0.3 eur
- sliced mushrooms ­ 0.5 eur
- oregano ­ 2.0 eur

#### Total Price = 6.45 eur

## Technology usage

- Please use Nest.js or Express.js
- NoSQL or Relational Database
- Please save the work on git
