require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');

//Routes imports
const usersRoutes = require('./routes/users.route');
const groupsRoutes = require('./routes/groups.route');
const membersRoutes = require('./routes/members.route');
const billsRoutes = require('./routes/bills.route');
const expensesRoutes = require('./routes/expenses.route');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Declaration of version 1.0 routes
app.use('/v1/users',usersRoutes);
app.use('/v1/groups', groupsRoutes);
app.use('/v1/members',membersRoutes);
app.use('/v1/bills',billsRoutes);
app.use('/v1/expenses',expensesRoutes);

//--------<Connecting the Nodejs to the mongodb Atlas>---------------
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology: true},function(err) {
  if (err) {
    console.log("Error connecting mongodb --❌");
    console.log(err);
  } else {
    app.listen(config.PORT, console.log(`Server is running on port:: ${config.PORT}`));
    console.log("Connected to the mongodb -- ✅");
  }
});
