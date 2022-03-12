module.exports = {
  port: process.env.PORT || 8000,
  mongoUrl: process.env.BULLETINBOARD_DB_URL || 'mongodb://localhost:27017/bulletinBoard',
};
