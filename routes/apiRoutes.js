// Router Module
const Router = require('express').Router();
//  File System Module
const fs = require('fs');

//Read notes from db.json
Router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) console.log(err);
        res.status(200).json(JSON.parse(data));
    });
});

//Write notes to db.json
Router.post('/api/notes', (req, res) => {
    let db = [];
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        {
            db = JSON.parse(data);
            db.push(req.body)
            writeDB(db,res)
        }
    });
});

// Delete note and write back to db.json
Router.delete('/api/notes/:id', function (req, res) {
    let db = [];
    fs.readFile('./db/db.json', (err, data) => {
        if (err) console.log(err);
        {
            db = JSON.parse(data);
            db.splice(req.params.id-1, 1);
            writeDB(db,res);
        }
    });
})
// Wrte to db.json 
function writeDB(db,res) {
    let i = 1;
    db.forEach(element => {
        element.id = i;
        i++;
    });
    db = JSON.stringify(db)
    fs.writeFile(
        "./db/db.json",
        db,
        (err) => err ? console.error(err) : res.send("ok")
    )
}

module.exports = Router;