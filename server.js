const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid')
const db = './db/db.json'

const PORT = 3001;

const app = express();

const dataRes = require("./db/db.json")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);

app.get('/api/notes', (req, res) => res.json(dataRes));

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} received for notes!}`)

    const { title, text } = req.body

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        fs.readFile(db, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            } else {
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



