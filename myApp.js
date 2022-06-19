require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))

// middleware
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

let curTime=()=>new Date().toString()
app.get('/now', (req, res, next) =>{
  req.time = curTime()
  next();
}, (req, res) =>{
  res.json({"time": req.time});
});

// log
console.log('Hello World');

// Serving static
app.use('/public',express.static('public'))

// res.sendFile
app.get('/', (req, res) => {res.sendFile(__dirname + '/views/index.html')})

// res.send
app.get('/', (req, res) => {res.send('Hello Express')})

// .env
app.use('/json', (req, res) => {
const msg = "Hello json"
const style = process.env.MESSAGE_STYLE;
let message = style === "uppercase" ? msg.toUpperCase() 
  // : "lowercase" ? msg.toLowerCase()
  : msg;
  res.json({"message":message})
})

// params
app.get('/:word/echo',(req,res) => {
  res.json({'echo': req.params.word})
})

app.post('/name',(req, res)=> {
   var first = req.body.first;
   var last = req.body.last;
   res.json({name: `${first} ${last}`});
 })

 module.exports = app;
