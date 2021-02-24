const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const movieRouter = require('./routes/api/movies');

const app = express();

const cors = require('cors');

// CORS allow for localhost
const whitelist = ['http://localhost:3000', 'http://localhost:3080']; //white list consumers
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept', 'x-auth-token']
};

app.use(cors(corsOptions)); //adding cors middleware to the express with above configurations

// Bodyparser Middleware
app.use(express.json());


// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, {
      useNewUrlParser: true
      , useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.use('/api/movies', movieRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));