const express = require("express");
const path = require("path");

// Set up the Express Server
const app = express();
const PORT = 8080;

// Set up Express to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());




// Routes
// --------------------------------------------------
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
});










// Start the server
app.listen(PORT, function(){
    console.log("Server started and is listening on PORT: " + PORT);
});