const express =require("express");
const blog = require("./data.js")
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

//Access specific blog post 

router.get("/blog/:id", (req, res) => {
    res.json(blog.filter(blog => blog.id === parseInt(req.params.id)))
})

//Access comment for a blog post 

router.get("/blog/:id/comment", (req, res) => {
    res.json(blog[req.params.id -1].comment)
})

//Access Emoji for a blog post 

router.get("/blog/:id/emoji/:eid", (req,res) => {
    res.json(blog[req.params.id -1].emoji[req.params.eid -1])
})

//Create Blog Entry 

router.post("/blog", (req,res) => {
    //function for creating blog entry
    const newBlog = {
        id: blog.length + 1,
        blogtitle: req.body.blogtitle,
        blogcontent: req.body.blogcontent,
        date: dayjs().toString(),
        gif: '',
        comment: [],
        emoji: [{eid: 1, emojiCount: 0}, {eid: 2, emojiCount: 0}, {eid: 3, emojiCount: 0}]
    }
    blog.push(newBlog)
    res.json('new blog post has been created')
}) 

//Create Blog Comment 

router.post("/blog/:id",(req,res)=>{
    const thisBlog = blog[req.params.id -1] 
    const thisComment = thisBlog.comment
    const newComment = {
        id: thisComment.length + 1,
        blogcomment: req.body.blogcomment
    }
    thisComment.push(newComment) 
    res.json('new comment has been added')
})



// Edit a blog post (not working :( )

/*

router.patch('/blog/:id', (req,res) => {
    let upBlog = req.body
    let requestedId = req.params.id
    let matchingBlog = blog.find((posttt) => posttt.id === requestedId);
   

    updatedBlog = { ...matchingBlog, ...upBlog }
     
    let blogIdx = blog.indexOf(matchingBlog)
    
    blog = [ ...blog.slice(0, blogIdx), updatedBlog, ...blog.slice(blogIdx + 1)]
    
    res.json(updatedBlog)
})
    

    const upBlog = req.body;
    const upBlogg = () => {
    if(blog.id === parseInt(req.params.id)){
        blog.blogtitle = upBlog.blogtitle ? upBlog.blogtitle : blog.blogtitle;
        blog.blogcontent = upBlog.blogtitle ? upBlog.blogcontent : blog.blogcontent;
        //blog.date = req.body.date;
        //blog.gif = req.body.gif;
    }}
    upBlogg() 
    res.json('this blog has been updated');
 
   );
}
   */



//Increase emoji count by 1 

router.patch("/blog/:id/emoji/:eid", (req, res) => {
    const thisBlog = blog[req.params.id -1]
    const emoji = thisBlog.emoji 
    emojiCount = emoji[req.params.eid-1].emojiCount++

    res.json("emoji count has been updated") 
}) 

//Delete a specific blog post 

router.delete("/blog/:id", (req, res) => {
    const id = req.params.id
    const blogIndex= blog.findIndex(p => p.id == id);
    blog.splice(blogIndex,1);
    res.json('blog entry has been deleted')
})

module.exports = router;

