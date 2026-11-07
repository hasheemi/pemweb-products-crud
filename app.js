require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productRoutes = require('./routes/productRoute');

app.get('/', (req, res) => {
    res.status(200).json({ hello: 'world' });
});

app.use('/products', productRoutes);

// 404 for unknown routes
app.use((req, res) => {
    res.status(404).json({ code: 404, message: `Route ${req.method} ${req.originalUrl} Not Found` });
});

// Global error handler (e.g. malformed JSON body)
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ code: 400, message: 'Invalid JSON body' });
    }
    console.error(err);
    res.status(500).json({ code: 500, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3009;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
