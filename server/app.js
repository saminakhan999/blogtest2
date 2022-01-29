const express = require("express")
const app = express()
const journalRoutes = require("./router")
const cors = require("cors")

app.use(express.json())
app.use(cors());
app.use("/", journalRoutes)


module.exports = app;

