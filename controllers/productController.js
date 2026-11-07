const prisma = require('../models/productModel');

const ERROR_500 = { code: 500, message: 'Terjadi Kesalahan Pada Server' };

const parseId = raw => {
    const id = Number(raw);
    if (!Number.isInteger(id) || id <= 0) return null;
    return id;
};

const validateProduct = (body = {}, { partial = false } = {}) => {
    const errors = [];
    const data = {};

    const hasName = body.name !== undefined;
    const hasPrice = body.price !== undefined;

    if (!partial || hasName) {
        if (typeof body.name !== 'string' || body.name.trim() === '') {
            errors.push('name wajib diisi dan harus berupa string yang tidak kosong');
        } else {
            data.name = body.name.trim();
        }
    }

    if (!partial || hasPrice) {
        const price = Number(body.price);
        if (
            body.price === '' ||
            body.price === null ||
            body.price === undefined ||
            !Number.isInteger(price) ||
            price < 0
        ) {
            errors.push('price wajib diisi dan harus berupa bilangan bulat non-negatif');
        } else {
            data.price = price;
        }
    }

    if (partial && !hasName && !hasPrice) {
        errors.push('minimal satu field (name atau price) wajib diisi');
    }

    return { errors, data };
};

// GET /products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json(ERROR_500);
    }
};

// GET /products/:id
exports.getProductById = async (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
        return res.status(400).json({
            code: 400,
            message: 'ID produk tidak valid. ID harus berupa bilangan bulat positif.',
        });
    }

    try {
        const product = await prisma.product.findUnique({ where: { id } });

        if (!product) {
            return res.status(404).json({
                code: 404,
                message: `Produk dengan id (${req.params.id}) tidak ditemukan`,
            });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json(ERROR_500);
    }
};

// POST /products
exports.createProduct = async (req, res) => {
    const { errors, data } = validateProduct(req.body ?? {});

    if (errors.length > 0) {
        return res.status(400).json({
            code: 400,
            message: 'Validasi gagal',
            errors,
        });
    }

    try {
        const product = await prisma.product.create({ data });
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json(ERROR_500);
    }
};

// PUT /products/:id
exports.updateProduct = async (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
        return res.status(400).json({
            code: 400,
            message: 'ID produk tidak valid. ID harus berupa bilangan bulat positif.',
        });
    }

    const { errors, data } = validateProduct(req.body ?? {}, { partial: true });

    if (errors.length > 0) {
        return res.status(400).json({
            code: 400,
            message: 'Validasi gagal',
            errors,
        });
    }

    try {
        const existing = await prisma.product.findUnique({ where: { id } });

        if (!existing) {
            return res.status(404).json({
                code: 404,
                message: `Produk dengan id (${req.params.id}) tidak ditemukan`,
            });
        }

        const product = await prisma.product.update({ where: { id }, data });
        res.status(200).json(product);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                code: 404,
                message: `Produk dengan id (${req.params.id}) tidak ditemukan`,
            });
        }
        console.error(error);
        res.status(500).json(ERROR_500);
    }
};

// DELETE /products/:id
exports.deleteProduct = async (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
        return res.status(400).json({
            code: 400,
            message: 'ID produk tidak valid. ID harus berupa bilangan bulat positif.',
        });
    }

    try {
        const existing = await prisma.product.findUnique({ where: { id } });

        if (!existing) {
            return res.status(404).json({
                code: 404,
                message: `Produk dengan id (${req.params.id}) tidak ditemukan`,
            });
        }

        const product = await prisma.product.delete({ where: { id } });
        res.status(200).json({
            code: 200,
            message: `Produk dengan id (${id}) berhasil dihapus`,
            data: product,
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                code: 404,
                message: `Produk dengan id (${req.params.id}) tidak ditemukan`,
            });
        }
        console.error(error);
        res.status(500).json(ERROR_500);
    }
};
