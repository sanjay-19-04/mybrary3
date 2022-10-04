if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express')
const app =express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./views/index')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
//please dont use process.env.DATABASE_URL,just copy and paste the url in the mongoose.connect and in 
// the url dont use localhost use 12.0.0.1
mongoose.connect("mongodb://127.0.0.1/mybrary"
    ,{ useNewUrlParser: true })

const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open', error => console.log('Connected to MongoDB'))


app.use('/',indexRouter)

app.listen(process.env.PORT || 3000)