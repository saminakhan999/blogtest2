const express =require("express")
const blog = require("./data.js")
const app = express()
const cors = require("cors")
const router= require("./router.js")

app.use(express.json())
app.use(cors());
app.use("/", router)




/*

// Function for changing emoji counter, new comments and blog posts

app.get("/", (req, res) => {
    res.send("hello")
})

app.get("/blog", (req, res) => {
    res.send(blog)
})

app.get("/blog/:id", (req, res) => {
    res.json(blog.filter(blog => blog.id === parseInt(req.params.id)))
})

app.post("/blog", (req,res) => {
    // bodyParser function for receiving data 
    //function
    res.send("new blog created");
})

app.patch("/blog/:id", (req, res) => {
    //function
    res.send("blog has been updated")
})

app.delete("/blog/:id", (req, res) => {
    blog = blog.filter((blog) => blog.id !== parseInt(req.params.id))
    res.send('blog entry has been deleted :(')
})

*/

module.exports = app;
