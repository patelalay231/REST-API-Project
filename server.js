const express = require("express");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const user_api = require('./routes/user_api');
const auth = require('./routes/auth');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const app = express();

// deciding port
const PORT = 8000;

// intialize database
require('./dbs/manage');

//middleware

//to encode the body
app.use(express.urlencoded({extended: false}));

//to encode the cookie
app.use(cookieParse());

// to parse the session
app.use(session({
    secret : 'APDWQRW4VSDNF4$SFS%29',
    resave : false,
    saveUninitialized : false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/',
      }),
}));


// intialize passport
require('./strategies/local');
app.use(passport.initialize());
app.use(passport.session());
// before using any api user should be logged

app.use('/api/users', user_api);
app.use('/auth',auth);

app.listen(PORT,() => console.log(`server started at port ${PORT}`));