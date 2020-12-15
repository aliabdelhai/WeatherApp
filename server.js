const express = require('express')
const path = require('path')
const api = require('./server/routes/api')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/weatherDB', { useNewUrlParser: true })

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)

const port = 3000;
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})