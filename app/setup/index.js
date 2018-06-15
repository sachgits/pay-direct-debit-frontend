'use strict'

// npm dependencies
const express = require('express')

// Local dependencies
const getController = require('./get.controller')
const postController = require('./post.controller')
const {validateAndRefreshCsrf, ensureSessionHasCsrfSecret} = require('../../common/middleware/csrf')
const checkSecureCookie = require('../../common/middleware/check-secure-cookie').middleware
const getMandate = require('../../common/middleware/get-mandate').middleware
const getGatewayAccount = require('../../common/middleware/get-gateway-account').middleware
const getService = require('../../common/middleware/get-service').middleware

// Initialisation
const router = express.Router()
const indexPath = '/setup/:mandateExternalId'
const paths = {
  index: indexPath
}

// Routing
router.get(paths.index, checkSecureCookie, ensureSessionHasCsrfSecret, validateAndRefreshCsrf, getMandate, getGatewayAccount, getService, getController)
router.post(paths.index, checkSecureCookie, validateAndRefreshCsrf, getMandate, getGatewayAccount, postController)

// Export
module.exports = {
  router,
  paths
}
