//Required Router Express Module
const Router = require('express').Router();
// HTML Routes
const htmlRoutes = require('./htmlRoutes');
// API Routes
const apiRoutes = require('./apiRoutes');
// Router use defined routes
Router.use(apiRoutes);
Router.use(htmlRoutes);

module.exports = Router;