'use strict'
const crypto = require('crypto')
const moment = require('moment')

const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      // recupera email da requisição
      const email = request.input('email')
      // verifica se email existe
      const user = await User.findByOrFail('email', email)
      // adiciona os valores do token e hr_criacao
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()
      // Salva dados no usuario
      await user.save()
      // envia email
      await Mail.send(
        ['emails.forgot_password'], // template
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        }, // parametros
        message => {
          message
            .to(user.email)
            .from('douglasscriptore@gmail.com', 'Douglas | RPC')
            .subject('Recuperação de Senha')
        }
      )
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Algo não deu certo, esse email existe?' } })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()
      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'O token de recuperação está expirado' } })
      }
      user.token = null
      user.token_created_at = null
      user.password = password
      await user.save()
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Algo deu errado ao resetar sua senha' } })
    }
  }
}

module.exports = ForgotPasswordController
