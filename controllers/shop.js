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
  const id = req.body.id;
  const quantity = req.body.quantity;
  let obj = {};
  Shop.findAll({ where: { id: id } }).then(([item]) => {
    if (quantity == item.quantity) item.destroy();
    item.quantity = item.quantity - quantity
    if (item.quantity < 0) item.destroy();
    obj = { ...item }
    return item.save()
  }).then(() => {
    res.send(obj);
  }).catch(err => console.log(err))
};
