const Basket = require("../model/basket");
const User = require("../model/user");
const Product = require("../model/product")

const getBaskets = (req, res) => {
  Basket.find((err, baskets) => {
    if (err) {
      res.send(err);
    }
    res.json(baskets);
  }).populate('user').populate('productos');
};

const getBasket = (req, res) => {
  Basket.findOne(
    { _id: req.params.basketID },
    (err, basket) => {
      if (err) {
        res.send(err);
      } else res.json(basket);
    }
  ).populate('user').populate('productos');
};

const createBasket = (req, res) => {
  const newBasket = new Basket({
    estado: "PENDIENTE",
    user: req.params.userID,
    total: 0,
  });
  newBasket.save((err, basket) => {
    if (err) {
      res.send(err);
    } else {
      User.findOne(
        { _id: req.params.userID },
        (err, user) => {
          if (err) {
            res.send(err);
          } else {
            user.carritos.push(basket._id);
            user.save((err, user) => {
              if (err) {
                res.send(err);
              }
            });
          }
        }
      );
    }

    res.json(basket);
  });
};

const updateBasket = (req, res) => {
  Basket.findOneAndUpdate(
    { _id: req.params.basketID },
    {
      $set: {
        estado: req.body.estado,
        total: req.body.total,
        productos: req.body.productos,
        user: req.body.user,
      },
    },
    { new: true },
    (err, Basket) => {
      if (err) {
        res.send(err);
      } else res.json(Basket);
    }
  ).populate('user').populate('productos');
};

const deleteBasket = (req, res) => {

  //busco el carrito
  Basket.findOne(
    { _id: req.params.basketID },
    (err, basket) => {

      if (err) {
        res.send(err);
      } else {

        //busco el user owner del carrito
        User.findOne(
          { _id: basket.user },
          (err, user) => {
            if (err) {
              res.send(err);
            } else {
              user.carritos = user.carritos.filter(id => id != req.params.basketID);
              user.save((err, user) => {
                if (err) {
                  res.send(err);
                }
                else {
                  Basket.deleteOne({ _id: req.params.basketID })
                    .then(() => {
                      res.json({ message: "Basket Deleted" });
                    })
                    .catch((err) => res.send(err));
                }
              });
            }
          }
        );

      };
    });
};

const addProduct = (req, res) => {
  Basket.findOne(
    { _id: req.params.basketID },
    (err, basket) => {
      if (err) {
        res.send(err);
      } else {
        //agrego el producto al carrito
        basket.productos.push(req.params.productID);
        Product.findOne(
          { _id: req.params.productID },
          (err, product) => {
            if (!err) {
              basket.total = basket.total + product.valor;
              basket.save((err, basket) => {
                if (err) {
                  res.send(err);
                }
                else {
                  res.json(basket);
                }
              });
            }
          }
        );
      };
    }).populate('user').populate('productos');
};

const removeProduct = (req, res) => {
  Basket.findOne(
    { _id: req.params.basketID },
    (err, basket) => {

      if (err) {
        res.send(err);
      } else {
        //elimino el producto al carrito
        basket.productos = basket.productos.filter(id => id != req.params.productID);

        Product.findOne(
          { _id: req.params.productID },
          (err, product) => {
            if (!err) {
              basket.total = basket.total - product.valor;
              basket.save((err, basket) => {
                if (err) {
                  res.send(err);
                }
                else {
                  res.json(basket);
                }
              });
            }
          }
        );
      };
    }).populate('user');
};

const closeBasket = (req, res) => {
  Basket.findOneAndUpdate(
    { _id: req.params.basketID },
    {
      $set: {
        estado: "CERRADO",
      },
    },
    { new: true },
    (err, Basket) => {
      if (err) {
        res.send(err);
      } else res.json(Basket);
    }
  ).populate('user').populate('productos');
};

module.exports = {
  getBasket,
  getBaskets,
  createBasket,
  updateBasket,
  addProduct,
  removeProduct,
  deleteBasket,
  closeBasket,
};