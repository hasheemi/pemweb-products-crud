const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productRoutes = require('./routes/productRoute');

app.get('/', (req, res) => {
    res.status(200).json({ hello: 'world' });
});

app.use('/products', productRoutes);

app.listen(3009, () => {
    console.log('Server running on http://localhost:3009');
});

// const express = require('express');
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const products = [
//     { id: 1, name: 'Buku', price: 15000 },
//     { id: 2, name: 'Pulpen', price: 5000 },
// ];

// app.get('/', (req, res) => {
//     res.status(200);
//     res.json({ hello: 'world' });
// });

// app.get('/products', (req, res) => {
//     res.status(200);
//     res.json(products);
// });

// app.get('/products/:id', (req, res) => {
//     let match = products.filter(e => e.id == req.params.id);
//     if (match.length == 0) {
//         res.status(400);
//         res.json({ code: 404, message: `Product With id (${req.params.id}) Not Found` });
//     } else {
//         res.json(match);
//     }
// });

// app.post('/products', (req, res) => {
//     let { id, name, price } = req.body;
//     products.push({ id, name, price });
//     res.status(201);
//     res.json(products);
//     // console.log(id);
// });

// app.listen(3009);
