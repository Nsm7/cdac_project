const express = require('express')
const bodyParser = require('body-parser')

// import the routers
const routerUser = require('./user')
const routerAdmin = require('./admin')


const app = express()

// add middlewares

// for CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// dont need any route for any file in thumbanils directory
app.use(bodyParser.json())
app.use(express.static('thumbnails'))

app.use('/user', routerUser)
app.use('/admin',routerAdmin)


app.listen(4000, '0.0.0.0', () => {
    console.log('server started  on port 4000')
})