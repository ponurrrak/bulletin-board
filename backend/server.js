const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

require('./config/passport/google');
require('./config/passport/facebook');

const { corsOptions, helmetOptions, mongoUrl, port } = require('./config/config');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postsRoutes = require('./routes/posts.routes');

const publicDirPath = path.join(__dirname, '../build');

const app = express();

/* MIDDLEWARE */
app.use(session({ secret: process.env.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((obj, serialize) => {
  serialize(null, obj);
});
passport.deserializeUser((user, deserialize) => {
  deserialize(null, user);
});

if(process.env.NODE_ENV !== 'production') {
  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));
}

app.use(helmet(helmetOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

/* AUTH ENDPOINTS */
app.use('/auth', authRoutes);

/* REACT WEBSITE */
app.use(express.static(publicDirPath));
app.use('*', (req, res) => {
  res.sendFile(path.join(publicDirPath, 'index.html'));
});

/* MONGOOSE */
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
