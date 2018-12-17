/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
'use strict'
// const Mail = use('Mail')
const crypto = require('crypto')
const uuid = require('uuid')
const User = use('App/Models/User')

class AuthController {

  async login({ request, auth, response, session }) {
    if (auth.user) {
      return response.redirect('/')
    }

    const { email, password } = request.all()

    try {
      await auth.attempt(email, password)
      return response.redirect('/')
    } catch (error) {
      session.flash({ loginError: 'Не найдена учетная запись!' })
      return response.redirect('/auth/login')
    }
  }

  async register({ request, response, auth }) {
    const user = new User(
      request.only([
        'username',
        'email',
        'password',
        'agreePolicy',
        'subscribeEmail'
      ])
    )

    const verificationToken = crypto
      .createHash('sha256')
      .update(uuid.v4())
      .digest('hex')

    user.merge({
      verificationToken,
      verified: false
    })

    await user.save()
    await auth.login(user)
    // Mail.send('emails.verification', { user: user }, (message) => {
    //   message.to(user.email, user.name)
    //   message.from(Config.get('mail.sender'))
    //   message.subject('Please Verify Your Email Address')
    // }).catch((error) => console.log(error))
    return response.redirect('/')
  }

  async logout({ auth, response }) {
    await auth.logout()
    return response.redirect('/')
  }
}

module.exports = AuthController
