const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL || "mongodb+srv://eparkgateway:yhWTBnjuXUwoQ5Fr@cluster0.qk4b2sv.mongodb.net/NEWDATA?retryWrites=true&w=majority&appName=Cluster0",

};
