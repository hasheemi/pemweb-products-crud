const products = require('../models/productModel');

// GET /products
exports.getAllProducts = (req, res) => {
    res.status(200).json(products);
};

// GET /products/:id
exports.getProductById = (req, res) => {
    let match = products.filter(e => e.id == req.params.id);

    if (match.length == 0) {
        res.status(404).json({
            code: 404,
            message: `Product With id (${req.params.id}) Not Found`,
        });
    } else {
        res.status(200).json(match);
    }
};

// POST /products
exports.createProduct = (req, res) => {
    let { id, name, price } = req.body;
    products.push({ id, name, price });
    res.status(201).json(products);
};
