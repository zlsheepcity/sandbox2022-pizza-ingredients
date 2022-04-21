# sandbox2022-pizza-ingredients
Test project with express.js and MongoDB.  
Read the «Project Task» section for project goals.  

# Project Description

I used test account on MongoDB cloud as database.  
express.js as server.  
and some javascript for business logic.  

## Folders

### `./server/`
The common code for working with the express.js/MongoDB.

#### Routes in `./server/routes`
- GET /ingredients
- GET /pizzas
- GET /pizza
- POST /pizza/addIngredient
- POST /pizza/removeIngredient
- POST /pizza/reorderIngredient

### `./logic/`
The main business logic for this task.

### `./temporary-logs`
Ignore it. Just dont want to delete these files.

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
