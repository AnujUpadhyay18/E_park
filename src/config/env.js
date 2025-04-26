const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL ||  "mongodb+srv://bholebaba:5TlRZHeUaPYEW2AD@cluster0.fmkrt.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0"

};
