'use strict'
const Antl = use('Antl')
class ForgotPassword {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      // validation rules
      email: 'required|email',
      redirect_url: 'required'
    }
  }
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ForgotPassword
