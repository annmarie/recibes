const User = require('../src/models/User')
const Q = require('q')
const prompt = require('prompt');
const config = require('../config')

const properties = [
  { name: 'email', type: 'string', required: true },
  { name: 'password', type: 'string', hidden: true, replace: "*", required: true },
  { name: 'admin', type: 'boolean', message: 'true or false', default: false, required: true }
]

prompt.start();

prompt.get(properties, (err, result) => {
  if (err)
    fin(err)
  else
    createUser(result, fin)
})


function createUser(data, fin) {
  const newuser = new User()
  newuser.email = data.email
  newuser.password = data.password
  newuser.admin = data.admin

  return newuser.save()
  .then(usr => console.log(usr))
  .catch(err => config.logger.debug(err))
  .finally(() => fin("==="))
}

function fin(msg) {
  if (msg) console.log(msg)
  process.exit()
}
