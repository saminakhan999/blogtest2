const express =require("express")
const blog = require("./data.json")
const app = express()
const cors = require("cors")
const router= require("./router.js")

app.use(express.json())
app.use(cors());
app.use("/", router)



app.get("/", (req,res) => {
    res.json("Hello world")
})

//Access all blog posts 

app.get("/blog", (req, res) => {
    res.json(blog)
})

//Access specific blog post //

app.get("/blog/:id", (req, res) => {
   // res.json(blog.filter(blog => blog.id === parseInt(req.params.id)))
   res.json(blog[req.params.id])
})

//Access comments for a blog post 

app.get("/blog/:id/comment", (req, res) => {
    res.json(blog[req.params.id].comment)
})

//Access individual comments for a blog post 

app.get("/blog/:id/comment/:bid", (req, res) => {
    const thisBlog = blog[req.params.id] 
    const comments = thisBlog.comment
    const oneComment = comments[req.params.bid]
    res.json(oneComment)
})

//Access Emoji for a blog post 

app.get("/blog/:id/emoji/:eid", (req,res) => {
    res.json(blog[req.params.id ].emoji[req.params.eid])
})

//Create Blog Entry 

app.post("/blog", (req,res) => {

        let id = Math.max(...Object.keys(blog)) +1 

        const newBlog = {
            blogtitle: req.body.blogtitle,
            blogcontent: req.body.blogcontent,
            date: dayjs().toString(),
            gif: '',
            comment: ''
        }

        const emojiOne = {emojiCount: 0}
        const emojiTwo = {emojiCount: 0}
        const emojiThree = {emojiCount: 0}
        
        let emoji = 'emoji'
        newBlog[emoji] = {};
        newBlog.emoji["1"] = emojiOne
        newBlog.emoji["2"] = emojiTwo
        newBlog.emoji["3"] = emojiThree
        blog[id] = newBlog

        res.status(201).json(blog)
    })


//Create Blog Comment 

app.post("/blog/:id",(req,res)=>{

        const thisBlog = blog[req.params.id] 
        const thisComment = thisBlog.comment
        const newComment = {
            blogcomment: req.body.blogcomment
        }
        let id = Math.max(...Object.keys(thisComment)) +1

        thisComment[id] = newComment

        res.status(201).json(newComment)

})



// Edit a blog post 



app.patch('/blog/:id', (req,res) => {

    let upBlog = req.body
    const thisBlog = blog[req.params.id] 
    console.log(upBlog)
    console.log(thisBlog.blogtitle)
    thisBlog.blogtitle = upBlog.blogtitle ? upBlog.blogtitle : thisBlog.blogtitle;
    thisBlog.blogcontent = upBlog.blogcontent ? upBlog.blogcontent : thisBlog.blogcontent;
 

    
    res.json(thisBlog)
})

// Edit a Comment
    

app.patch('/blog/:id/comment/:bid', (req,res) => {

    let upBlogComment = req.body
    const thisBlog = blog[req.params.id] 
    const comments = thisBlog.comment
    const oneComment = comments[req.params.bid]
    oneComment.blogcomment = upBlogComment.blogcomment ? upBlogComment.blogcomment : oneComment.blogcomment;
    
    res.json(oneComment)
})



//Increase emoji count by 1 

app.patch("/blog/:id/emoji/:eid", (req, res) => {
    const thisBlog = blog[req.params.id]
    const emoji = thisBlog.emoji 
    emojiCount = emoji[req.params.eid].emojiCount++
    res.json(emoji[req.params.eid]) 
}) 

//Delete a specific blog post 

app.delete("/blog/:id", (req, res) => {
    const thisBloggg = blog[req.params.id]
    console.log(thisBloggg)
    //delete thisBlog 
    /*const blogIndex= blog.findIndex(p => p.id == id);
    blog.splice(blogIndex,1); */
    res.status(204).json('blog entry has been deleted')
})


module.exports = app;
