const express = require('express')
const app = express()
const peopleRouter = require('./routes/people.js')


const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next()
}

// use logger middleware
app.use(logger)
// static assets
app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())


// routers
app.use('/api/v1/people', peopleRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})