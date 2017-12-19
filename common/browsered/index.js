'use strict'

// NPM dependencies
const $ = window.$ = window.jQuery = require('jquery') // Put this on window for cross compatability

// GOV.UK Toolkit dependencies
require('../../govuk_modules/govuk_frontend_toolkit/javascripts/govuk/show-hide-content')
require('../../govuk_modules/govuk_frontend_toolkit/javascripts/govuk/stick-at-top-when-scrolling')

// Local dependencies
const fieldValidation = require('./field-validation')

$(document).ready($ => {
  const showHideContent = new window.GOVUK.ShowHideContent()
  showHideContent.init()
  window.GOVUK.stickAtTopWhenScrolling.init()
})

fieldValidation.enableFieldValidation()
