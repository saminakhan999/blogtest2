const express = require("express");
const blog = require("../data.json");
const router = express.Router();
const dayjs = require("dayjs");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const fs = require("fs");

function writeToDisk(data) {
  const tmp = JSON.stringify(data);
  fs.writeFile("./db/data.json", tmp, (err) => {
    if (err) {
      throw err;
    }
    console.log("data.json has been updated");
  });
}

// router.get("/", (req, res) => {
//   res.json("Hello world");
// });

//Access all blog posts

router.get("/", (req, res) => {
  res.json(blog);
});

//Access specific blog post //

router.get("/:id", (req, res) => {
  try {
    let requestedBlog = blog[req.params.id];
    if (!requestedBlog) {
      throw new Error(`Blog not found!`);
    }
    res.json(requestedBlog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//Access comments for a blog post

router.get("/:id/comment", (req, res) => {
  try {
    let requestedBlog = blog[req.params.id];
    if (!requestedBlog) {
      throw new Error(`Blog comments not found!`);
    }
    let requestedBlogComments = requestedBlog.comment;
    res.json(requestedBlogComments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//Access individual comments for a blog post

router.get("/:id/comment/:bid", (req, res) => {
  try {
    const thisBlog = blog[req.params.id];
    const comments = thisBlog.comment;
    const oneComment = comments[req.params.bid];
    if (!oneComment) {
      throw new Error(`Blog comment not found!`);
    }
    res.json(oneComment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//Access Emoji for a blog post

router.get("/:id/emoji/:eid", (req, res) => {
  try {
    const thisEmoji = blog[req.params.id].emoji[req.params.eid];
    if (!thisEmoji) {
      throw new Error(`Emoji not found!`);
    }
    res.json(thisEmoji);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//Create Blog Entry

router.post("/", (req, res) => {
  try {
    let id = Math.max(...Object.keys(blog)) + 1;

    const newBlog = {
      blogtitle: req.body.blogtitle,
      blogcontent: req.body.blogcontent,
      timestamp: dayjs()
        .format("DD/MM/YYYY " + "hh:mm:ss")
        .toString(),
      gif: req.body.gif,
      comment: {},
    };
    if (!req.body.blogtitle || !req.body.blogcontent) {
      throw new Error(`Please enter all required fields!`);
    }
    const emojiOne = { emojiCount: 0 };
    const emojiTwo = { emojiCount: 0 };
    const emojiThree = { emojiCount: 0 };

    let emoji = "emoji";
    newBlog[emoji] = {};
    newBlog.emoji["1"] = emojiOne;
    newBlog.emoji["2"] = emojiTwo;
    newBlog.emoji["3"] = emojiThree;
    blog[id] = newBlog;

    res.status(201).json(newBlog);

    writeToDisk(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//Create Blog Comment

router.post("/:id", (req, res) => {
  try {
    const thisBlog = blog[req.params.id];
    const thisComment = thisBlog.comment;
    const newComment = {
      blogcomment: req.body.blogcomment,
      timestamp: dayjs()
        .format("DD/MM/YYYY " + "hh:mm:ss")
        .toString(),
    };
    if (!req.body.blogcomment) {
      throw new Error(`Please enter a comment!`);
    }
    let id;
    if (!Object.keys(thisComment).length) {
      id = 1;
    } else {
      id = Math.max(...Object.keys(thisComment)) + 1;
    }
    thisComment[id] = newComment;

    res.status(201).json(newComment);

    writeToDisk(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Edit a blog post

router.patch("/:id", (req, res) => {
  let upBlog = req.body;
  const thisBlog = blog[req.params.id];
  thisBlog.blogtitle = upBlog.blogtitle ? upBlog.blogtitle : thisBlog.blogtitle;
  thisBlog.blogcontent = upBlog.blogcontent
    ? upBlog.blogcontent
    : thisBlog.blogcontent;
  thisBlog.gif = upBlog.gif ? upBlog.gif : thisBlog.gif;

  res.json(thisBlog);

  writeToDisk(blog);
});

// Edit a Comment

router.patch("/:id/comment/:bid", (req, res) => {
  let upBlogComment = req.body;
  const thisBlog = blog[req.params.id];
  const comments = thisBlog.comment;
  const oneComment = comments[req.params.bid];
  oneComment.blogcomment = upBlogComment.blogcomment
    ? upBlogComment.blogcomment
    : oneComment.blogcomment;

  res.json(oneComment);

  writeToDisk(blog);
});

//Increase emoji count by 1

router.patch("/:id/emoji/:eid/plus", (req, res) => {
  const thisBlog = blog[req.params.id];
  const emoji = thisBlog.emoji;
  emojiCount = emoji[req.params.eid].emojiCount++;
  res.json(emoji[req.params.eid]);

  writeToDisk(blog);
});

//Decrease emoji count by 1

router.patch("/:id/emoji/:eid/minus", (req, res) => {
  const thisBlog = blog[req.params.id];
  const emoji = thisBlog.emoji;
  emojiCount = emoji[req.params.eid].emojiCount--;
  res.json(emoji[req.params.eid]);

  writeToDisk(blog);
});

//Delete a specific blog post

router.delete("/:id", (req, res) => {
  let thisBloggg = blog[req.params.id];
  for (member in thisBloggg) {
    delete thisBloggg[member];
  }
  thisBloggg["Alert"] = "This blog has been deleted";
  res.status(204).json("Blog has been deleted");

  writeToDisk(blog);
});

// Delete a specific Comment

router.delete("/:id/comment/:bid", (req, res) => {
  const thisBlog = blog[req.params.id];
  const comments = thisBlog.comment;
  let oneComment = comments[req.params.bid];
  for (member in oneComment) {
    delete oneComment[member];
  }
  oneComment["Alert"] = "This comment has been deleted";

  res.status(204).json("this comment has been deleted");

  writeToDisk(blog);
});

module.exports = router;
