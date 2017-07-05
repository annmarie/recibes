const Q = require('q')
const _ = require('lodash')

const Recipes = require('../src/collections/Recipes')
const Users = require('../src/collections/Users')

const getuser = new Users({ email: 'admin@localhost' })
const getrecipe = new Recipes({ id: 'qKEgKEkx' })
const getrecipes = new Recipes()

const promises = [

  getuser.findOne(),

  getrecipe.findOne()
  .then(rcp => [rcp, rcp.getIngredients(), rcp.getTags()])
  .spread((rcp, ingrs, tags) => [rcp, ingrs, tags]),

   getrecipes.searchKeywords('summer'),

   getrecipes.searchIngredients('blueberries'),

   getrecipes.searchHeadlines('Bowl'),

]

Q.allSettled(promises).then(rows => {
  _.each(rows, (rset) => {
    console.log("---")
    if (rset.state === "fulfilled")
      console.log(rset.value)
    else
      console.log(rset.reason)
  })
}).finally(() => {
  console.log("===")
  process.exit()
})
