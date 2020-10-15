const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const exphbs = require('express-handlebars');


// Load config 
dotenv.config({ path: './config/config.env' })

// passport config

require('./config/passport')(passport);

connectDB()

const app = express();

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('env'))
}


// Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// sessions-express
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


// static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on ${PORT}`);
})