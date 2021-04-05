const express = require('express');
const bodyParser = require('body-parser')
const fetch = require("node-fetch");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');
const ip = require('ip');
const withAuth = require('./middleware');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const User = require('./models/User');

const secret = 'mysecretsshhh';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

mongoose.connect(process.env.MONGO_URI, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${process.env.MONGO_URI}`);
  }
});

app.post('/api/register', function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });

  user.save(function(err) {
    if (err) {
      res.status(500)
        .send(err);
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post('/api/authenticate', function(req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
          });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401)
              .json({
                error: 'Incorrect email or password'
            });
          } else {
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true })
              .sendStatus(200);
          }
        });
      }
    });
});

app.post('/api/github', function(req, res) {
  const { code } = req.body;

  fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => {
    return res.status(200).json(response);
  }).catch(error => {
    console.log(error);
    return res.status(400).json(error);
  });
});

app.use('/about.json', function(req, res) {
  const time = (new Date).getTime()
  res.json({
    client: {
      host: ip.address()
    },
    server: {
      current_time: time,
      services: [
        {
          name: "Weather",
          widgets: [
            {
              name: "Daily Weather",
              description: "Display current weather in a chosen city",
              params: [
                {
                  name: "city",
                  type: "String"
                },
                {
                  name: "country",
                  type: "String"
                }
              ]
            }
          ]
        },
        {
          name: "News",
          widgets: [
            {
              name: "News by country",
              description: "Display the top news in a chosen country",
              params: [
                {
                  name: "country",
                  type: "String"
                }
              ]
            },
            {
              name: "News by topic",
              description: "Display the world top news about the given topic",
              params: [
                {
                  name: "topic",
                  type: "String"
                },
                {
                  name: "language",
                  type: "String"
                }
              ]
            },
            {
              name: "News by date",
              description: "Display top news during specific time",
              params: [
                {
                  name: "topic",
                  type: "String"
                },
                {
                  name: "date",
                  type: "Date"
                }
              ]
            }
          ]
        },
        {
          name: "Converter",
          widgets: [
            {
              name: "Currency converter",
              description: "Convert your currency in the one you want and display it",
              params:[
                {
                  name: "currency",
                  type: "Number"
                }
              ]
            }
          ]
        },
        {
          name: "Github",
          widgets: [
            {
              name: "Account informations",
              description: "Display basic informations about github account",
              params: []
            },
            {
              name: "Create new repository",
              description: "Create a new repository from given parameters",
              params: [
                {
                  name: "repository",
                  type: "String"
                },
                {
                  name: "description",
                  type: "String"
                },
                {
                  name: "private",
                  type: "Bool"
                }
              ]
            }
          ]
        }
      ]
    }
  })
});

app.get('/api/secret', withAuth, function(req, res) {
    res.send('The password is potato');
});

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 8080);