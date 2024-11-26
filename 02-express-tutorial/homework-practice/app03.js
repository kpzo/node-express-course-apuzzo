const express = require('express');
const path = require('path');

const app = express();

// setup static and middleware
app.use(express.static('./static'))

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
// adding to static assets
// SSR
// })

app.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found booo</h1>')
});

app.listen(3000, () => {
    console.log('server is listening on port 3000....')
})