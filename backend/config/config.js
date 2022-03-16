module.exports = {
  port: process.env.PORT || 8000,
  mongoUrl: process.env.BULLETINBOARD_DB_URL || 'mongodb://localhost:27017/bulletinBoard',
  providers: ['google', 'facebook'],
  helmetOptions: {
    contentSecurityPolicy: {
      directives: {
        'img-src': ['*'],
        'connect-src': ['\'self\'', '*.cloudinary.com:*'],
      },
    },
    crossOriginEmbedderPolicy: false,
  },
  corsOptions: {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  },
  noUpdateFields: [
    '_id',
    'version',
    'authorId',
    'authBy',
    'releaseTime',
    //'photoOriginal',
    //'photoUploaded',
    '__v',
  ],
};

