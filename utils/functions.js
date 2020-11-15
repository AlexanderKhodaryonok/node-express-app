const crypto = require("crypto");

const getPaginatedUsers = (limit, page, data) => {
  const numberLimit = Number(limit);
  const numberPage = Number(page);
  const firstUserIdx = numberLimit * (numberPage - 1);
  const requestededUsers = [];
  for(let i = firstUserIdx; i < numberLimit + firstUserIdx; i++) {
    if (!data[i]) break;
    requestededUsers.push(data[i]);
  }

  return requestededUsers;
}

const generateId = () => crypto.randomBytes(16).toString("hex");

const checkEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: 'Incorrect payload'})
  } else {
    next()
  };
}

const findIndex = (data, hash) => {
  return data.findIndex(item => {
    return item.hash === hash
  })
}

const findItem = (data, hash) => {
  return data.find(item => {
    return item.hash === hash;
  })
}

module.exports = { getPaginatedUsers, generateId, checkEmptyBody, findIndex, findItem };
