const express =  require('express');
let data =  require('../../data');
const { getPaginatedUsers, generateId, checkEmptyBody, findIndex, findItem } = require('../../utils');

const router = express.Router();

router.get('/:limit/:page', (req, res) => {
  const { limit = 10, page = 1 } = req.params;
  if (limit > 15) {
    return res.status(400).json({message: 'Incorrect payload'});
  }
  const users = getPaginatedUsers(limit, page, data);
  if (!users.length) {
    return res.json({message: 'Users not found'});
  }
  res.json(users);
});

router.get('/:hash', (req, res) => {
  const { hash } = req.params;
  const user = findItem(data, hash)
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

const addUser = (req, res) => {
  const newUser = { hash: generateId(), ...req.body };
  data.push(newUser);
  res.status(201).json({ hash: newUser.hash });
}

router.post('/', ([checkEmptyBody, addUser]));

const updateUser = (req, res) => {
  const { hash } = req.params;
  const user = findIndex(data, hash)
  if (!user) {
    return res.status(400).json({ message: 'Incorrect user hash' });
  }
  const body = req.body;
  const index = findIndex(data, hash)
  let updatedUser ={ ...data[index], ...body};
  res.status(404).json({ hash: updatedUser.hash })
}

router.put('/:hash', ([checkEmptyBody, updateUser]));

const deleteUser = (req, res) => {
  const { hash } = req.params;
  const index = findIndex(data, hash);
  if (index < 0) return res.status(404).json({ message: 'User not found'})
  data = data.filter(item => item.hash !== hash);
  res.json({ hash })
}

router.delete('/:hash', ([deleteUser]));

module.exports = router;
