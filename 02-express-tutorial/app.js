const express = require('express');
const { products } = require('./data.js');

const app = express();

app.use(express.static('./public'))

app.get('/api/v1/test', (req, res) => {
    console.log('user hit the resource')
    res.json({message: 'it worked!'})
});

app.get('/api/v1/products', (req, res) => {
    console.log('looking for product page')
    const productPreview = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image}
    })
    res.json(productPreview)
})

app.get('/api/v1/products/:productID', (req, res) => {
    const { productID } = req.params;
    const idToFind = parseInt(req.params.productID);
    const singleProduct = products.find((product) =>
        product.id === Number(idToFind));
    req.params.productID = Number(req.params.productID);
    if(!singleProduct){
        return res.status(404).send('product does not exist')
    }
    return res.json(singleProduct)
})

app.get('/api/v1/query', (req, res) => {
    const { search, limit, price } = req.query;
    let sortedProducts = [...products]

    if(search){
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if(price){
        sortedProducts = sortedProducts.filter((product) => {
            return product.price <= Number(price)
        })
    }
    if(sortedProducts.length <1){
        res.status(200).json({success: true, data: []})
    }
    res.status(200).json(sortedProducts)
});


app.all('*', (req, res) => {
    res.status(404).send('resource not found -or- 404')
});

app.get('/api/v1/query/:search', (req, res) => {
    const searchFor = req.params.search;
    const userLimit = req.query.limit;

    let searchResults = products.filter(product => product.name.startsWith(searchFor));

    if (userLimit) {
        searchResults = searchResults.slice(0, Number(userLimit));
    }

    res.status(200).json(searchResults);
});


app.listen(3000, () => {
    console.log('server is listening on port 3000....')
})