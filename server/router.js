const express =require("express");
const blog = require("./data.json")
const router = express.Router();
const dayjs = require("dayjs");
var relativeTime = require('dayjs/plugin/relativeTime');
const { Router } = require("express");
dayjs.extend(relativeTime)
const Fuse = require('fuse.js')



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
            gif: req.body.gif,
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

router.post("/blog/:id",(req,res)=>{

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



router.patch('/blog/:id', (req,res) => {

    let upBlog = req.body
    const thisBlog = blog[req.params.id] 
    console.log(upBlog)
    console.log(thisBlog.blogtitle)
    thisBlog.blogtitle = upBlog.blogtitle ? upBlog.blogtitle : thisBlog.blogtitle;
    thisBlog.blogcontent = upBlog.blogcontent ? upBlog.blogcontent : thisBlog.blogcontent;
    thisBlog.gif = upBlog.gif ? upBlog.gif : thisBlog.gif;
 

    
    res.json(thisBlog)
})

// Edit a Comment
    

router.patch('/blog/:id/comment/:bid', (req,res) => {

    let upBlogComment = req.body
    const thisBlog = blog[req.params.id] 
    const comments = thisBlog.comment
    const oneComment = comments[req.params.bid]
    oneComment.blogcomment = upBlogComment.blogcomment ? upBlogComment.blogcomment : oneComment.blogcomment;
    
    res.json(oneComment)
})



//Increase emoji count by 1 

router.patch("/blog/:id/emoji/:eid", (req, res) => {
    const thisBlog = blog[req.params.id]
    const emoji = thisBlog.emoji 
    emojiCount = emoji[req.params.eid].emojiCount++
    res.json(emoji[req.params.eid]) 
}) 

//Delete a specific blog post 

router.delete("/blog/:id", (req, res) => {
    let thisBloggg = blog[req.params.id]
    let deleted;
    for (member in thisBloggg){
        delete thisBloggg[member];
    }
    thisBloggg['Alert'] = "This blog has been deleted";
    //console.log(thisBloggg)
    res.json("Blog has been deleted");

  
    //res.json('blog entry has been deleted')
})
router.delete('/blog/:id/comment/:bid', (req,res) => {
    const thisBlog = blog[req.params.id] 
    const comments = thisBlog.comment
    let oneComment = comments[req.params.bid]
    for(member in oneComment){
        delete oneComment[member]
    }
    oneComment['Alert'] = "This comment has been deleted";
    
    /*oneComment.blogcomment = upBlogComment.blogcomment ? upBlogComment.blogcomment : oneComment.blogcomment;*/

    
    res.json('this comment has been deleted')

})

//adding search function

router.get("/search", (req,res) =>{
    let query = req.query.q;
    allBlogs = Object.values(blog);
    const options = {
        keys: ['blogtitle', "blogcontent"]
      }
      
      const fuse = new Fuse(allBlogs, options)
      
      const result = fuse.search(query)
      res.json(result)
//add error handling  
}) 
// All CRUD implemented --

module.exports = router;


