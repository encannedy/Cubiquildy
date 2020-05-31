const express = require('express');
const app = express();
const fs = require('fs');
const path = require ("path");

module.exports = (app) => {
//initialize notesData

let notesData= [];

//write out your routes to correspond with the front end routes
//fs readfile and writefile will be in here

//retrieve notes data already in the json object
app.get("/api/notes"), (err, res) => {
    try{
        notesData=fs.readFileSync("db/db.json", "utf8");
        console.log ("Hello World");
        notesData=json.parse(notesData);
    
  }catch (err) {
    console.log("\n error catch api get");
    console.log(err);
  }
  
  res.json(notesData);
};

//post/write new data to the json object
//must use json stringify and parse in order to successfully and correctly parse the data

app.post("/api/notes"), (req,res) =>{

try{
notesData= fs.writeFileSync("db/db.json", "utf8");
console.log(notesData);
notesData=json.parse(notesData);

req.body.id =notesData.length;
notesData.push(req.body);
notesData=json.stringify(notesData);
fs.writeFile("db/db.json", notesData, "utf8",  (err)=> {
    if (err) throw err;
});

res.json(json.parse(notesData));

}catch (err) {
    throw err,
    console.log ("\n error post api"),
    console.log(err);
}
res.json(notesData);
};
//delete old data from the json object/ delete note using id filter

app.delete("/api/notes/:id"), (req, res) => {
    try {
        notesData =fs.writeFileSync("db/db.json", "utf8");
        notesData= json.parse(notesData);
        notesData = notesData.filter((note) => {
            return note.id != req.params.id;

        });
        notesData= json.stringify(notesData);
        fs.writeFile("db/db.json", notesData, "utf8",  err=> {
            if (err) throw err;
        });
            res.send(json.parse(notesData));
        }catch (err) {
            throw err, 
            console.log ("error delete");
        }
};  

//  GET requests


app.get(`/api/notes`, (req, res)=> {
    res.sendFile(path.join(__dirname, "db/db.json"));
  });

};