const Product = require("../model/product");

const getProducts = (req, res) => {
  Product.find((err, products) => {
    if (err) {
      res.send(err);
    }
    res.json(products);
  });
};

const createProduct = (req, res) => {
  const product = new Product({
    nombre: req.body.nombre,
    valor: req.body.valor,
  });

  product.save((err, product) => {
    if (err) {
      res.send(err);
    }
    res.json(product);
  });
};

const updateProduct = (req, res) => {
  Product.findOneAndUpdate(
    { _id: req.params.productID },
    {
      $set: {
        nombre: req.body.nombre,
        valor: req.body.valor,
      },
    },
    { new: true },
    (err, Product) => {
      if (err) {
        res.send(err);
      } else res.json(Product);
    }
  );
};

const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.productID })
    .then(() => res.json({ message: "Product Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
