

/*
const app = require('./app.js');
const port = 3000;

app.listen(port, () => { console.log(`Express now departing from port ${port}`)})



*/

const server = require("./app")


server.listen(process.env.PORT || 3000, () => console.log("Express now departing from port")) 



