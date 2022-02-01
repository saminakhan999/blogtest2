const express =require("express")
const blog = require("./data.js")
const app = express()
const cors = require("cors")
const router= require("./router.js")

app.use(express.json())
app.use(cors());
app.use("/", router)



module.exports = app;
