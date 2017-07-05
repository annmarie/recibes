const Hashids = require('hashids')
const hashing = new Hashids('9M87UlxYlN6EEG4ND3UfPBOq8RedygIY2CjYMDTs', 8)
const _ = require('lodash')

module.exports = {

  encode: (id) => (_.isNumber(id)) ? hashing.encode(id) : id,
  decode: (id) => (_.isNumber(id)) ? id : _.head(hashing.decode(id)),

}