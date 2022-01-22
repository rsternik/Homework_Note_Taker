//Required files and Node modules 
const express = require('express');
const routes = require('./routes/routes.js')

//Access Port
const PORT = process.env.PORT || 8080;

//Express setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

// App listen on defined PORT
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);