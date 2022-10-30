class SessionHelper {
  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setUserDetails(userDetails) {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem('userDetails'));
  }

  removeSessions() {
    localStorage.clear();
    window.location.href = '/login';
  }

  setEmail(email) {
    localStorage.setItem('email', email);
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  setOTP(otp) {
    localStorage.setItem('otp', otp);
  }

  getOTP() {
    return localStorage.getItem('otp');
  }
}

export const {
  setToken,
  getToken,
  setUserDetails,
  getUserDetails,
  removeSessions,
  setEmail,
  getEmail,
  setOTP,
  getOTP,
} = new SessionHelper();
