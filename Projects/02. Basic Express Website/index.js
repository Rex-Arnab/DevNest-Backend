const express = require('express')

const app = express()
app.set('view engine', 'ejs')
app.set(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {title: 'home'})
})

app.get('/about', (req, res) => {
    res.render('index', {title: 'about'})
})

app.listen(8000, () => {
    console.log("Started http://localhost:8000")   
})