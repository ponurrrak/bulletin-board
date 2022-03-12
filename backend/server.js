const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const formidable = require('formidable');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const config = require('./config/config');
require('./config/passport/google');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postsRoutes = require('./routes/posts.routes');

const publicDirPath = path.join(__dirname, '../build');
//const uploadDirPath = process.env.NODE_ENV === 'production' ? path.join(publicDirPath, 'upload') : path.join(__dirname, '../public/upload');
const uploadDirPath = path.join(publicDirPath, 'upload');

const app = express();

/* MIDDLEWARE */
app.use(session({ secret: process.env.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
if(process.env.NODE_ENV !== 'production') {
  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  };
  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));
}
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'img-src': ['\'self\'', '*.googleusercontent.com:*'],
    },
  },
  crossOriginEmbedderPolicy: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if(['POST', 'PUT'].includes(req.method) && contentType.startsWith('multipart/form-data')){
    const form = formidable({
      multiples: false,
      uploadDir: uploadDirPath,
      keepExtensions: true,
    });
    form.parse(req, (err, fields, file) => {
      req.body = fields;
      req.file = file;
      next();
    });
  } else {
    next();
  }
});

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
mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
app.listen(config.port, () => {
  console.log('Server is running on port: ' + config.port);
});
