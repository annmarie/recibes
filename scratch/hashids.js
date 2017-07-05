const hids = require('../hashids')

const id = hids.encodeId(3)
const num = hids.decodeId(id)

console.log(id + " < -- id")
console.log(num + " < -- num")
process.exit()

