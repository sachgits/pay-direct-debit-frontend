'use strict'

// npm dependencies
const supertest = require('supertest')
const cheerio = require('cheerio')
const chai = require('chai')
const expect = chai.expect

// Local dependencies
const getApp = require('../../server').getApp

describe('direct debit guarantee controller', () => {
  describe('when requesting guarantee without a mandate id', () => {
    let response, $

    before(done => {
      supertest(getApp())
        .get(`/direct-debit-guarantee`)
        .end((err, res) => {
          response = res
          $ = cheerio.load(res.text)
          done(err)
        })
    })

    it('should return a 200 status code', () => {
      expect(response.statusCode).to.equal(200)
    })
    it('should not display back links to the payment journey', () => {
      expect($(`.back`).find('a').attr('href')).to.not.exist // eslint-disable-line no-unused-expressions
      expect($(`.form-group`).find('a').attr('href')).to.not.exist // eslint-disable-line no-unused-expressions
    })
  })
  describe('when requesting direct debit guarantee from setup page with a mandate id', () => {
    const mandateExternalId = 'sdfihsdufh2e'
    const paymentAction = 'setup'
    let response, $

    before(done => {
      supertest(getApp())
        .get(`/direct-debit-guarantee/${paymentAction}/${mandateExternalId}`)
        .end((err, res) => {
          response = res
          $ = cheerio.load(res.text)
          done(err)
        })
    })

    it('should return a 200 status code', () => {
      expect(response.statusCode).to.equal(200)
    })
    it('should display back links to the payment journey', () => {
      expect($(`.back`).find('a').attr('href')).to.equal(`/setup/${mandateExternalId}`)
      expect($(`.form-group`).find('a').attr('href')).to.equal(`/setup/${mandateExternalId}`)
    })
  })

  describe('when requesting direct debit guarantee from confirmation page with a mandate id', () => {
    const mandateExternalId = 'sdfihsdufh2e'
    const paymentAction = 'confirmation'
    let response, $

    before(done => {
      supertest(getApp())
        .get(`/direct-debit-guarantee/${paymentAction}/${mandateExternalId}`)
        .end((err, res) => {
          response = res
          $ = cheerio.load(res.text)
          done(err)
        })
    })

    it('should return a 200 status code', () => {
      expect(response.statusCode).to.equal(200)
    })
    it('should display back links to the payment journey', () => {
      expect($(`.back`).find('a').attr('href')).to.equal(`/confirmation/${mandateExternalId}`)
      expect($(`.form-group`).find('a').attr('href')).to.equal(`/confirmation/${mandateExternalId}`)
    })
  })
})
