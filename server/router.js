const express = require("express");
const router = express.Router();
const journalData = require("./data")
const journalEntry = require("./journal")

//all routes starting with "/journal"
router.get("/" , (req,res) => {
    res.send("hi")
})

//route for all journal entries data
router.get("/journal" , (req,res) => {
    res.send(journalData)
})


// route for retrieving journal entries by id
router.get("/journal/:id", (req,res) => {
    res.send(journalData[req.params.id -1])
})



//adding journal entries to our database
router.post("/journal", (req,res) => {
    console.log("Route reached");
    // pushing what we send to journalData in the request.body
    // console.log(req.body);
    const data = req.body;
    const newEntry = journalEntry.createEntry(data)
    console.log("new entry created")
    res.send(`Added a new journal entry!`);
})




module.exports = router;
