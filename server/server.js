const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./queries');

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", db.defaultRoute)
app.post('/api/db/:model', db.getModels)
app.post('/api/db/create/:model', db.createModels) 
app.get('/api/db/:model/new_id', db.getIdForModel) 

const PORT = process.env.EXPRESS_APP_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 
 




