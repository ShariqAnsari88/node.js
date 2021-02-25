const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.send('This is http://vidly.com')
})

module.exports = route