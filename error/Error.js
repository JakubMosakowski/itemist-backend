export default class Error {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

export const FAILED_LOGIN_ERROR = new Error(401, 'Email or password is incorrect.')
export const INTERNAL_SERVER_ERROR = new Error(500, 'Internal server error.')
