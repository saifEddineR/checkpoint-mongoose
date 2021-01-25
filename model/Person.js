const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model('person', PersonSchema);
