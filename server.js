// Required resources
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid')
const db = './db/db.json'
const PORT = 3001;
const app = express();
const dataRes = require("./db/db.json")

// Express app use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// default get route to index.html
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// route to notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);

app.get('/api/notes', (req, res) => res.json(dataRes));
// Post route 
app.post('/api/notes', (req, res) => {
    console.log(`${req.method} received for notes!}`)

    const { title, text } = req.body
    // condition if data is enter in post route
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        // read db.json
        fs.readFile(db, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            }
            // write post to db.json
            else {
                const parsedData = JSON.parse(data)
                parsedData.push(newNote)
                res.json(parsedData)
                fs.writeFile(db, JSON.stringify(parsedData, null, 4), (err) =>
                    err ? console.error(err) : console.log(`note written to ${db}`)
                );
            }

        })
    }
})



