'use strict'

class AuthLogin {
  get rules () {
    return {
      'email': 'required|email',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'required': 'Заполните поле {{ field }}.',
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();
    return this.ctx.response.redirect('back');
  }
}

module.exports = AuthLogin
