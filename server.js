const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
// mongoose and connect to db -----------
mongoose.connect(
  'mongodb+srv://salragath:trythisagain96@cluster0.klaz5.mongodb.net/namexd?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Routes -------------------------------
app.use('/users', require('./routes/users'));

// create server on port 5000 ------------
app.listen(5000, () => {
  console.log('connect on port 5000');
});
