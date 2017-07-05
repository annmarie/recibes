const _ = require('lodash')
const log4js = require('log4js')
const logger = log4js.getLogger()

const getSettings = (file) => {
  let rset = {}
  try { rset = require(file) } catch(e) {
    logger.debug('config file not found: ' + file)
  }
  return rset
}

const settings = getSettings('./settings')
const overrides = getSettings('./local.settings')
const config = _.defaultsDeep(overrides, settings)

config.logger = logger

module.exports = _.defaultsDeep(overrides, settings)

