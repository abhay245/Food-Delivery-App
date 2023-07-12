require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongo = require('./db.js');
const helmet = require('helmet');
const  xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
// Connect to MongoDB
mongo();

app.use(cors());
const port =5000;
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Routes
const createUserRoute = require('./Routes/CreateUser.js');
const displayDataRoute = require('./Routes/DisplayData.js');
const OrderData = require('./Routes/OrderData.js');
// Register the routes
app.use('/', createUserRoute);
app.use('/',displayDataRoute);
app.use('/', OrderData);
app.listen(port, () => {
  console.log(`Food Delivery App listening on port ${port}`);
});
