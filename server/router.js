const express = require("express");
const router = express.Router();
const journalData = require("./data")

router.get("/" , (req,res) => {
    res.send("Hello world")
})

router.get("/journal" , (req,res) => {
    res.send(journalData)
})

router.get("/journal/:id", (req,res) => {
    res.send(journalData[req.params.id -1])
})

router.post("/journal", (req,res) => {
    console.log("Route reached");
    console.log("new entry created")
    res.send(`Added a new journal entry!`);
})




module.exports = router;
