var express = require('express');
var router = express.Router();
router.use(express.json());

/* import model schema -----------------------------*/
const person = require('../model/Person');
/* GET users requests ----------------------------- */
router.get('/', function (req, res) {
  person.find({}, (err, data) => {
    if (err) throw err;
    else res.json(data);
  });
});
router.get('/userID/:id', (req, res) => {
  person.findById(req.params.id, (err, data) => {
    if (err) throw err;
    else res.json(data);
  });
});
router.get('/userName/:name', (req, res) => {
  let fName = req.params.name;
  // /fName/i
  person.find({ name: fName }, (err, data) => {
    if (err) throw err;
    else res.json(data);
  });
});
router.get('/favFood/:food', (req, res) => {
  person.findOne({ favoriteFoods: req.params.food }, (err, data) => {
    if (err) throw err;
    else res.json(data);
  });
});
router.get('/byFavFood/:food', (req, res) => {
  person
    .find({ favoriteFoods: req.params.food })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) throw err;
      else res.json(data);
    });
});
/* add new user -------------------------------------- */
router.post('/newUser', (req, res) => {
  let newPerson = new person(req.body);
  newPerson.save((err, msg) => {
    if (err) throw err;
    else res.json({ msg: 'person registered' });
  });
});
/* add many users ------------------------------------ */
router.post('/newUsers', (req, res) => {
  person.create(req.body, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: 'users added' });
  });
});
/* update users data by id --------------------------- */
router.put('/updateFood/:id', (req, res) => {
  person.findByIdAndUpdate(
    req.params.id,
    { $push: { favoriteFoods: req.body.favoriteFoods } },
    (err) => {
      if (err) throw err;
      else res.json({ msg: 'updated' });
    }
  );
});
/*delete user by ID ---------------------------------- */
router.delete('/deleteUser/:id', (req, res) => {
  person.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) throw err;
    else res.json({ msg: 'user deleted' });
  });
});
/*delete users by name ------------------------------- */
router.delete('/deleteUsers/:name', (req, res) => {
  person.deleteMany({ name: req.params.name }, (err) => {
    if (err) throw err;
    else res.json({ msg: 'users deleted' });
  });
});
module.exports = router;
