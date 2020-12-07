const express =  require('express');
let data =  require('../../data');
const { getPaginatedUsers, generateId, checkEmptyBody, findIndex, findItem, authenticate, authenticateJWT } = require('../../utils');
const { NotFoundError }  = require("../../customErrors");

const router = express.Router();

// router.use(([authenticate]));
router.use(([authenticateJWT]));

router.get('/:limit/:page', (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.params;
  if (limit > 15) {
    return res.status(400).json({message: 'Incorrect payload'});
  }
  const users = getPaginatedUsers(limit, page, data);
  if (!users.length) {
    throw new NotFoundError('User not found', 404);
  }
  res.json(users);
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
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

router.delete("/:hash", (req, res) => {
  try {
    const { hash } = req.params;
    const index = findIndex(data, hash);
    if (index < 0) {
      throw new NotFoundError("User not found", 404);
    }
    data = data.filter((item) => item.hash !== hash);
    res.json({ hash });
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
});

module.exports = router;
