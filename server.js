
const bodyParser = require('body-parser');
// Express to run server and routes
const express = require('express');
const cors = require('cors');
// Start up an instance of app
const app = express();

//middleweres
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Initialize the main project folder
app.use(express.static('website'));


const data = [];
app.post('/add', (req, res) => {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['feelings'] = req.body.feelings;
  console.log(req.body)
  res.send(projectData);
});
app.get('/all', (req, res) => {
  res.send(projectData);
});





/*Intialize Server*/
const port = 8000;
app.listen(port, listening)
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}


