'use strict'

const User = use('App/Models/User')

class UserController {
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

  async logout({ auth, response }) {
    await auth.logout()
    return response.redirect('/')
  }

  async create({ request, response, auth }) {
    const user = await User.create(
      request.only(['username', 'email', 'password'])
    )

    await auth.login(user)
    return response.redirect('/')
  }
}

module.exports = UserController
