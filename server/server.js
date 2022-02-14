const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors("*"));
app.use(express.json());

const Fuse = require("fuse.js");

// Search function

app.get("/search", (req, res) => {
  let query = req.query.q;
  query = query.replace(/\+/g, " ").toLowerCase().trim();
  allBlogs = Object.values(blog);
  const options = {
    keys: ["blogtitle"],
  };
  const fuse = new Fuse(allBlogs, options);
  const result = fuse.search(query);
  if (result.length == 0) {
    res.status(404).json("No search results found");
  } else {
    res.json(result[0]);
  }
});

const blogRoutes = require("./controllers/blogRouter");
app.use("/blog", blogRoutes);

const adminRoutes = require("./controllers/adminRouter");
app.use("/admin", adminRoutes);

module.exports = app;
