// setting up express and cors for full stack
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8000;

// Setting up database
const db = require('./config/mongoose');

// Middleware for to get and format data from page
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
  

// app.get('/', function(req, res) {
//   res.send('<h1>Hello People</h1>');
// });

// Setting up routes
app.use('/', require('./routes/index'));

// Startting server
app.listen(port, function(err) {
  if (err) {
    console.log(`Error in running the server: ${port}`);
  }

  console.log(`Server is running on port: ${port}`);
});
