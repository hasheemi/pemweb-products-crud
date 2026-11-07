const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// /products
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);

// /products/:id
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
