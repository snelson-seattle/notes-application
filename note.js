const fs = require("fs");
const noteId = parseInt(fs.readFileSync("./db/noteId.txt"));

class Note {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        Note.lastId++;
        this.id = Note.lastId;
    }
}
if(isNaN(noteId)){
    Note.lastId = 0;
}else{
    Note.lastId = noteId;
}



module.exports = Note;