const express =require("express");
const blog = require("./data.json")
const router = express.Router();
const dayjs = require("dayjs");
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)



router.get("/", (req,res) => {
    res.json("Hello world")
})

//Access all blog posts 

router.get("/blog", (req, res) => {
    res.json(blog)
})

//Access specific blog post //

router.get("/blog/:id", (req, res) => {
   // res.json(blog.filter(blog => blog.id === parseInt(req.params.id)))
   res.json(blog[req.params.id])
})

//Access comments for a blog post 

router.get("/blog/:id/comment", (req, res) => {
    res.json(blog[req.params.id].comment)
})

//Access individual comments for a blog post 

router.get("/blog/:id/comment/:bid", (req, res) => {
    const thisBlog = blog[req.params.id] 
    const comments = thisBlog.comment
    const oneComment = comments[req.params.bid]
    res.json(oneComment)
})

//Access Emoji for a blog post 

router.get("/blog/:id/emoji/:eid", (req,res) => {
    res.json(blog[req.params.id ].emoji[req.params.eid])
})

//Create Blog Entry 

router.post("/blog", (req,res) => {

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

        res.json(blog)
    })


//Create Blog Comment 

router.post("/blog/:id",(req,res)=>{

        const thisBlog = blog[req.params.id] 
        const thisComment = thisBlog.comment
        const newComment = {
            blogcomment: req.body.blogcomment
        }
        let id = Math.max(...Object.keys(thisComment)) +1

        thisComment[id] = newComment
        console.log(blog)

        res.json(newComment)

})



// Edit a blog post 



router.patch('/blog/:id', (req,res) => {

    let upBlog = req.body
    const thisBlog = blog[req.params.id] 
    console.log(upBlog)
    console.log(thisBlog.blogtitle)
    thisBlog.blogtitle = upBlog.blogtitle ? upBlog.blogtitle : thisBlog.blogtitle;
    thisBlog.blogcontent = upBlog.blogcontent ? upBlog.blogcontent : thisBlog.blogcontent;
 

    
    res.json('this blog has been updated')
})

// Edit a Comment
    

router.patch('/blog/:id/comment/:bid', (req,res) => {

    let upBlogComment = req.body
    const thisBlog = blog[req.params.id] 
    const comments = thisBlog.comment
    const oneComment = comments[req.params.bid]
    oneComment.blogcomment = upBlogComment.blogcomment ? upBlogComment.blogcomment : oneComment.blogcomment;
    
    res.json('this comment has been updated')
})



//Increase emoji count by 1 

router.patch("/blog/:id/emoji/:eid", (req, res) => {
    const thisBlog = blog[req.params.id]
    const emoji = thisBlog.emoji 
    emojiCount = emoji[req.params.eid].emojiCount++
    res.json("emoji count has been updated") 
}) 

//Delete a specific blog post 

router.delete("/blog/:id", (req, res) => {
    const thisBloggg = blog[req.params.id]
    console.log(thisBloggg)
    //delete thisBlog 
    /*const blogIndex= blog.findIndex(p => p.id == id);
    blog.splice(blogIndex,1); */
    res.json('blog entry has been deleted')
})

// All CRUD implemented --

module.exports = router;


