// Router Module
const Router = require('express').Router();
// Path Module
const path = require('path');

// Default Route
Router.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

// Notes Route
Router.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

module.exports = Router;