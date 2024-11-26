const express = require('express');
const app = express();
const { products } = require('./data');

// app.get('/', (req, res) => {
//     // res.json([{name: 'john'},{name: 'susan'}])
//     res.json(products)
// });

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>')
});

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product)  => {
        const { id, name, image } = product;
        return { id, name, image }
    })
    res.json(newProducts)
})

app.get('/api/products/:productID', (req, res) => {
    // console.log(req)
    // console.log(req.params)
    const { productID } = req.params;
    const singleProduct = products.find((product) => 
        product.id === Number(productID))
    if(!singleProduct){
        return res.status(404).send('product does not exist')
    }
    return res.json(singleProduct)
})

app.get('/api/products/:productID/review/:reviewID', (req, res) => {
    console.log(req.params)
    res.send('howdy yall')
})


app.listen(3000, () => {
    console.log('server is listening on port 3000....')
})