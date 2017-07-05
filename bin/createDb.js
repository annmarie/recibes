const Q = require('q')
const conf = require('../config')
const prompt = require('prompt');
const mysql = require('mysql')
const dbcreate = require('../databases/migrate.js')

const properties = [{
  name: 'rebuild',
  message: "Please enter yes or no.",
  description: 'Are you sure? [y/n]',
  pattern: /^(y(es)?|n(o)?)$/i,
  type: 'string',
  required: true,
}]

prompt.start();

prompt.get(properties, (err, result) => {
  if (err)
    fin(err)
  else if (result.rebuild.match(/^[Yy]/))
    build(fin)
  else
    fin("no changes")
})


function build(fin) {
  const database = conf.dbs.mysql.dbname

  const dbconn = mysql.createConnection({
    host: conf.dbs.mysql.host,
    user: conf.dbs.mysql.user,
    password: conf.dbs.mysql.password
  })

  const dbqueryPromise = (sql) => {
   const q = Q.defer()
   dbconn.query(sql, q.makeNodeResolver())
   return q.promise
  }

  dbconn.query("drop database " + database, () => {
    dbconn.query("create database "  + database, () => {
     dbconn.changeUser({database}, (err) => {
       if (err) fin(err)
       dbcreate.reduce((ret, sql) => {
         const dbquery = dbqueryPromise(sql)
         return (ret) ? ret.then( () => dbquery ) : dbquery
        }, '')
        .catch((e) => fin(e))
        .finally(() => fin("done"))
      })
    })
  })
}

function fin(msg) {
  if (msg) config.logger.debug(msg)
  process.exit()
}
