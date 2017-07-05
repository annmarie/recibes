#  Recibes

copy local config sample file `config/local.settings.sample.js` to `config/local.settings.js`
edit and add correct credentials for mysql

Run the following:
```
npm install

node bin/createDb

node bin/createUser

webpack --config webpack.config.js -p

node server.js
```

Notes:

* maybe we could use the usda database for ingredients:  https://ndb.nal.usda.gov/ndb/
