const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();



// /admin/user => GET
router.get('/items', shopController.getItem);

// /booking/add-user => POST
router.post('/add-item', shopController.addItem);

// /booking/delete-user => POST
router.post('/delete-item', shopController.deleteItem);

module.exports = router;
