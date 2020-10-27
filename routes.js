// This file was automatically added by xdn deploy.
// You should commit this file to source control.
const { BACKENDS } = require('@xdn/core/constants')
const { Router } = require('@xdn/core/router')
const { nextRoutes } = require('@xdn/next')

const cacheSSR = ({ cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24 * 365,
    },
    browser: false,
  })
}

const cacheAPI = ({ cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24 * 365,
    },
    browser: {
      maxAgeSeconds: 0,
      serviceWorkerSeconds: 60 * 60 * 24,
    },
  })
}

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) =>
    serviceWorker('.next/static/service-worker.js')
  )
  .get('/', cacheSSR)
  .get('/search', cacheSSR)
  .get('/product/:id', cacheAPI)
  .get('/_next/data/:build/index.json', cacheAPI)
  .get('/_next/data/:build/search.json', cacheAPI)
  .get('/_next/data/:build/product/:id.json', cacheAPI)
  .get('/api/bigcommerce/catalog/products', cacheAPI)
  .use(nextRoutes) // automatically adds routes for all files under /pages
