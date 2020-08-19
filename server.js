const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'chris',
    password : 'christopher',
    database : 'smart-brain'
  }
});

// db.select("*").from("users").then(data => console.log(data));

const app = express();
app.use(cors());
app.use(bodyParser.json()); 

app.get('/', (req, res ) => {res.send(database.users)})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleGetProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(3001, () => {
  console.log('App is running on port 3001'); 
})

/**
 * / --> res = Welcome home 
 * /signin --> Post = success/Fail
 * /register --> Post = user
 * /profile/;id --> Get =usre
 * /image --    put = user
 */