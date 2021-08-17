import express from 'express';
import mysql from 'mysql'
import path from 'path'
import bodyParser from 'body-parser';
import cons from 'consolidate';
import dust from 'dustjs-helpers';


const app = express()
app.engine('dust', cons.dust)
app.set('view engine', 'dust')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recipebookdb'
})

conn.connect((err) => {
    console.log("Mysql 1Connected")
})

app.get('/', (req, res) => {
    conn.query('SELECT * FROM recipes', (error, results, fields) => {
        if (error) throw error;
        res.render('index', {recepi: results})
    });
})

app.post('/add', (req, res) => {
    conn.query("INSERT INTO recipes(name, ingredients, directions) VALUES ('"+req.body.name+"', '"+req.body.ingredients+"', '"+req.body.directions+"')", (err, results) => {
        res.redirect('/')
    })
})

app.delete('/delete/:id', (req, res) => {
    conn.query("DELETE from recipes where id = "+req.params.id, (err, result) => {
        if(err) throw err;
        res.send(200)
    })
})

app.post('/edit', (req, res) => {
    conn.query("UPDATE recipes SET name='"+req.body.name+"', ingredients='"+req.body.ingredients+"', directions='"+req.body.directions+"' WHERE id = "+req.body.id, (err, result) => {
        res.redirect('/')
    })
})

app.listen(3000, () => {
    console.log("Listing on Port 8001")
})