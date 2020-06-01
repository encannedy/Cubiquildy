const fs = require('fs');

let db = require("../db/db");

module.exports = (app) => {


let id= "";

//write out your routes to correspond with the front end routes
//fs readfile and writefile will be in here

//retrieve notes data already in the json object

app.get("/api/notes",  (req, res)=> {
    fs.readFile('db/db.json', "utf8",  (error, data) =>{
        res.json(JSON.parse(data));
    })
});

//post/write new data to the json object
//must use json stringify and parse in order to successfully and correctly parse the data

app.post("/api/notes"), async (req,res) =>{

let newNote = req.body;

if (db ==="") {newNote.id = 1 
} else {
    newNote.id =db[db.length -1].id +1;
}
   id= newNote.id;
   
   db.push(newNote);
   
   let newDB = JSON.stringify(db); 
   
   await fs.writeFile("db/db.json", newDB, (err) => {

    if (err) throw err;
    console.log("note saved");
    res.json(newNote);
});

fs.readFile('db/db.json',"utf8", (error, data) =>{
    db = JSON.parse(data);
});


app.delete("/api/notes/:id", function (req, res) {
    let choiceId = req.params.id;

    let dbUpdate = db.filter(x => {
        return x.id != choiceId;
    })
   console.log(dbUpdate);

    fs.writeFile("db/db.json", JSON.stringify(dbUpdate), (err) => {
        if (err) throw err;
        console.log('The note has been deleted!');
        db = dbUpdate;
        res.json({ok:true});
    });

});

};
};