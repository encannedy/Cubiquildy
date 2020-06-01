const express = require('express');
const app = express();
const fs = require('fs');
const path = require ("path");
let db = require("../db/db");

module.exports = (app) => {
//initialize notesData


//write out your routes to correspond with the front end routes
//fs readfile and writefile will be in here

//retrieve notes data already in the json object
let id = "";

    // Displays all notes
    app.get("/api/notes", function (req, res) {
        fs.readFile('db/db.json',"utf8", function(error, data){
            res.json (JSON.parse(data))
        })

    });

//post/write new data to the json object
//must use json stringify and parse in order to successfully and correctly parse the data

app.post("/api/notes"), async function(req,res) {

let notesData= req.body;
if (db === "") {
    notesData.id = 1
} else{
    notesData.id= db[db.length - 1] + 1;
}

id=notesData.id;

db.push(notesData);

let newDB= JSON.stringify(db);

await fs.writeFile('db/db.json', newDB, (err) =>{
    if (err) throw err;
    console.log('note saved');
    res.json(notesData);
});

console.log(notesData);
fs.readFile('db/db.json', "utf8", function(error, data){
    db=JSON.parse(data);
})

};


//delete old data from the json object/ delete note using id filter

app.delete("/api/notes/:id", function (req, res) {
    let chosenID = req.params.id;

    let updatedDb = db.filter(x => {
        return x.id != chosenID;
    })
   console.log(updatedDb);

    fs.writeFile("db/db.json", JSON.stringify(updatedDb), (err) => {
        if (err) throw err;
        console.log('The note has been deleted!');
        db = updatedDb;
        res.json({ok:true});
    });

});

};