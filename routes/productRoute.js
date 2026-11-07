const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// /products
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);

// /products/:id
router.get('/:id', productController.getProductById);

module.exports = router;
