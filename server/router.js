const express = require("express");
const router = express.Router();
const journalData = require("./data")
const journalEntry = require("./journal")

router.get("/" , (req,res) => {
    res.send("Hello World")
})

router.get("/journal" , (req,res) => {
    res.send(journalData)
})


router.get("/journal/:id", (req,res) => {
    res.send(journalData[req.params.id -1])
})


router.post("/journal", (req,res) => {
    console.log("Route reached");
    const data = req.body;
    const newEntry = journalEntry.createEntry(data)
    console.log("New entry")
    res.send(`Added a new journal entry!`);
})


module.exports = router;
