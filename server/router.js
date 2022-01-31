const express =require("express");
const blog = require("./data.js")
const router = express.Router();

// add -1 to all ids

router.get("/", (req,res) => {
    res.send("Hello world")
})


router.get("/blog", (req, res) => {
    res.send(blog)
})


router.get("/blog/:id", (req, res) => {
    res.send(blog.filter(blog => blog.id === parseInt(req.params.id)))
})

router.get("/blog/:id/comment", (req, res) => {
    res.send(blog[req.params.id].comment)
})

router.get("/blog/:id/emoji/:id", (req,res) => {
    res.send(blog[req.params.id].emoji[req.params.id])
})


router.delete("/blog/:id", (req, res) => {
    const id = req.params.id
    const blogIndex= blog.findIndex(p => p.id == id);

    blog.splice(blogIndex,1);
    res.send('blog entry has been deleted')
})

module.exports = router;


