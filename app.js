const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const PORT = 3001;
let cors = require('cors');
const route = require('../src/Routes')
const mongoose = require('mongoose');
// const mongoURL = 'mongodb://localhost:27017/budget';
const mongoURL = 'mongodb+srv://joxinsaji30:cozENMB0nHcbS1RE@budgetcluster.sutxkci.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(route);

mongoose.connect(mongoURL).then(() => {
    console.log('MongoDB Successfully Connected!')
}).catch(()=>{
    console.log("MongoDB Connection Failed");
});

app.listen(PORT,()=>{
    console.log("App running successfully");
})