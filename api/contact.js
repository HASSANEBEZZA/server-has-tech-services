const express = require('express');
const cors = require('cors');
const contactController = require('../controllers/emailController'); 
const app = express();


app.use(cors());


app.use(express.json());


app.post('/', contactController.handleContactForm);  


module.exports = app;
