const Shop = require('../models/shop');

exports.addItem = (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description;
  const quantity = req.body.quantity;
  Shop.create({
    name: name,
    price: price,
    description: description,
    quantity: quantity
  }).then((item) => {
    res.send(item)
  }).catch(err => console.log(err))
};



exports.getItem = (req, res) => {
  Shop.findAll().then((item) => {
    res.send(item)
  })
};

exports.deleteItem = (req, res) => {
  const number = req.body.Number;
  let obj = {};
  Shop.findAll({ where: { Number: number } }).then(([user]) => {
    console.log(user)
    obj = { ...user }
    return user.destroy()
  }).then(() => {
    res.redirect(obj);
  }).catch(err => console.log(err))
};
