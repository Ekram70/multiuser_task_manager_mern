import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginRequest } from '../../APIrequest/APIrequest';
import { ErrorToast, IsEmail, IsEmpty } from '../../helpers/FormHelper';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  let { email, password } = loginData;

  const handleChange = (e) => {
    e.preventDefault();
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (data) => {
    const { email, password } = data;

    if (!IsEmail(email)) {
      ErrorToast('Valid Email Address Required!');
    } else if (IsEmpty(password)) {
      ErrorToast('Password Required!');
    } else {
      let res = await LoginRequest(email, password);
      if (res) {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h5 className="text-center">Sign In</h5>
                <input
                  type="email"
                  placeholder="Use Email"
                  className="form-control animated fadeInUp mt-2"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Use Password"
                  className="form-control animated fadeInUp mt-2"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <button
                  className="btn w-100 animated fadeInUp float-end btn-primary mt-2"
                  onClick={() => handleSubmit(loginData)}
                >
                  Next
                </button>
                <hr />
                <div className="text-center w-100">
                  <Link
                    className="text-center animated fadeInUp"
                    to="/Registration"
                  >
                    Sign Up
                  </Link>
                  <br />
                  <Link className="text-center animated fadeInUp" to="/sendOtp">
                    Forget Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
