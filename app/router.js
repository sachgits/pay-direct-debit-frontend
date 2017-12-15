'use strict'

// Local dependencies
const healthcheck = require('./healthcheck')
const index = require('./index')
const directDebitGuarantee = require('./direct-debit-guarantee')
const confirmation = require('./confirmation')

// Export
module.exports.bind = app => {
  app.use(healthcheck.router)
  app.use(index.router)
  app.use(directDebitGuarantee.router)
  app.use(confirmation.router)
}
