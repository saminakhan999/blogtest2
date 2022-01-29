const journalData = require("./data");


class journalEntry {
    constructor(entry) {
        this.id = entry.id
        this.message = entry.message
    }

    static get all() {
        const Entries = journalData.map((entry) => new journalEntry(entry))
        return Entries
    }

    // Method for creating a new entry
    static createEntry(entry) {
        const newEntry = new journalEntry({
            id: journalData.length + 1,
            ...entry,
        })
        journalData.push(newEntry)
        return newEntry
    }

    // function to return an id
    static getId(id) {
        return journalData[id-1]
        
    }

}

module.exports = journalEntry;
