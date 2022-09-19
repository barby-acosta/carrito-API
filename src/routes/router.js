const router = require("express").Router();
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/product");
const { getBasket, getBaskets, createBasket, updateBasket, addProduct, removeProduct, deleteBasket, closeBasket } = require("../controllers/basket");
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/user");


router.get("/", (req, res) => {
  res.send("Let's build a Carrito API!");
});

module.exports = router;

router.get("/products", getProducts);
router.post("/products", createProduct);
router.put("/products/:productID", updateProduct);
router.delete("/products/:productID", deleteProduct);

router.get("/baskets", getBaskets);
router.get("/baskets/:basketID", getBasket);
router.get("/baskets/create/:userID", createBasket);
router.put("/baskets/:basketID", updateBasket);
router.get("/baskets/addProduct/:basketID/:productID", addProduct);
router.get("/baskets/removeProduct/:basketID/:productID", removeProduct);
router.get("/baskets/close/:basketID", closeBasket);
router.delete("/baskets/:basketID", deleteBasket);

router.get("/users", getUsers);
router.get("/users/:dni", getUser);
router.post("/users", createUser);
router.put("/users/:userID", updateUser);
router.delete("/users/:userID", deleteUser);
