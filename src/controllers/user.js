const User = require("../model/user");

const getUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  }).populate('carritos');
};

const getUser = (req, res) => {
  User.findOne(
    { dni: req.params.dni },
    (err, user) => {
      if (err) {
        res.send(err);
      } else res.json(user);
    }
  ).populate('carritos');
};

const createUser = (req, res) => {
  const user = new User({
    nombre: req.body.nombre,
    dni: req.body.dni,
  });

  user.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userID },
    {
      $set: {
        nombre: req.body.nombre,
        dni: req.body.dni,
        carritos: req.body.carritos,
      },
    },
    { new: true },
    (err, User) => {
      if (err) {
        res.send(err);
      } else res.json(User);
    }
  );
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.userID })
    .then(() => res.json({ message: "User Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
