const express = require("express")
const app = express()

// Some Inbuild MiddleWares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Setting a Static Folder for the unchaning Assets like images, css etc
app.use(express.static("public"))

// app.use("public",express.static("public"))   <--- go for this approch if you want multiple static folder then give them custom path/names


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/file/:name", (req, res) => {
    res.sendFile(req.params.name)
})

app.listen(3000, () => console.log("Listening at http://localhost:3000"))