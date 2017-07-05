// - databases - //
const mysql = require('mysql')
const conf = require('../config')

const dbs = conf.dbs

const connections = {
  // create mysql connection
  mysql: mysql.createPool({
    connectionLimit : 100,
    host: dbs.mysql.host,
    user: dbs.mysql.user,
    password: dbs.mysql.password,
    database: dbs.mysql.dbname,
    multipleStatements: true,
  })
}

// connect to mysql
connections.mysql.getConnection((err) => {
  if (err) {
    config.logger.debug("mysql error")
    config.logger.debug(err.code)
    config.logger.debug(err.fatal)
  }
})

module.exports = connections