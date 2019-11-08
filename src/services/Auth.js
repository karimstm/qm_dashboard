const jwt = require("jsonwebtoken");
class AuthService {
  isValid(token) {
    const decoded = jwt.decode(token);
    if (decoded) {
      if (Date.now() >= decoded.exp * 1000) return false;
      else return true;
    }
  }
  isAuthenticated() {
    const token = localStorage.getItem("token");
    return this.isValid(token);
  }
}

export default new AuthService();
