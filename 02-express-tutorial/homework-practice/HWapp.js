const express = require('express');
const path = require('path');
const app = express();
// setup static and middleware
app.use(express.static('./public'))

app.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found -or- four oh four</h1>')
});

app.listen(3000, () => {
    console.log('server is listening on port 3000....')
})