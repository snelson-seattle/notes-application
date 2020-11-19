const express = require("express");
const path = require("path");
const fs = require("fs");
const Note = require("./note");
const notes = JSON.parse(fs.readFileSync("./db/db.json")); // Load saved notes

// Set up the Express Server
const app = express();
const PORT = 8080;

// Set up Express to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Make the 'assets' folder available to the served pages
app.use("/assets", express.static(path.join(__dirname, "/public/assets")));


// --------------------------------------------------
// Routes
// --------------------------------------------------

// GET 
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res){
    return res.sendFile(path.join(__dirname, "/db/db.json").toString());
});

// Catchall GET route
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// POST
app.post("/api/notes", function(req, res){
    // make a new note from request data
    let note = new Note(req.body.title, req.body.text);
    fs.writeFileSync("./db/noteId.txt", note.id); // record the note id for next time server restarts

    // Add new note to existing notes
    notes.push(note);    

    // Save the note to database
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

    return res.json("Note saved successfully.");
});

// DELETE
app.delete("/api/notes/:id", function (req, res) {
   let id = req.params.id;
   for(let i = notes.length - 1; i >= 0; i--){
       if(notes[i].id == id){
           notes.splice(i, 1);
       }
   }
   fs.writeFileSync("./db/db.json", JSON.stringify(notes));
   return res.json("Delete successful!");
});

// End of Routes
// ------------------------------------------------------


const savedNotes = fs.readFile("./db/db.json", function(err){
    if(err) throw err;           
});

// Start the server
app.listen(PORT, function(){
    console.log("Server started and is listening on PORT: " + PORT);
});