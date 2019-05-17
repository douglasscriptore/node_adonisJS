'use strict'

const Env = use('Env')

module.exports = {
  sentry: {
    dsn: Env.get('SENTRY_DNS')
  }
}
