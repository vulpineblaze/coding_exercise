const express = require('express')
const app = express()
const session = require('express-session');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient


var the_port = 3006;

var db
var configDB = require('./config/database.js');
var root_dir = "http://codingexercise.fusionbombsderp.com";


app.use(session({secret: "-- ENTER CUSTOM SESSION SECRET --"}));


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

 

MongoClient.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./routes.js')(app, db); // load our routes and db in our app 

  app.listen(process.env.PORT || the_port, "127.0.0.1", () => {
    console.log('listening on '+the_port)
  })
})
