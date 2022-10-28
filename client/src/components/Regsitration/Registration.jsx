import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegistrationRequest } from '../../APIrequest/APIrequest';
import {
  ErrorToast,
  IsEmail,
  IsEmpty,
  IsMobile,
} from '../../helpers/FormHelper';

const Registration = () => {
  const [userData, setUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    mobile: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  let { email, firstName, lastName, mobile, password } = userData;

  const handleSubmit = async (data) => {
    const { email, firstName, lastName, mobile, password } = data;
    if (!IsEmail(email)) {
      ErrorToast('Valid Email Address Required!');
    } else if (IsEmpty(firstName)) {
      ErrorToast('First Name Required!');
    } else if (IsEmpty(lastName)) {
      ErrorToast('Last Name Required!');
    } else if (!IsMobile(mobile)) {
      ErrorToast('Valid Mobile Number Required!');
    } else if (IsEmpty(password)) {
      ErrorToast('Password Required!');
    } else {
      let res = await RegistrationRequest(
        email,
        firstName,
        lastName,
        mobile,
        password,
        'photo'
      );

      if (res) {
        window.location.reload();
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card animated fadeIn w-100">
            <div className="card-body">
              <h5 className="text-center">Sign Up</h5>
              <input
                type="email"
                placeholder="User Email"
                className="form-control animated fadeInUp mt-2"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="First Name"
                className="form-control animated fadeInUp mt-2"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="form-control animated fadeInUp mt-2"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
              <input
                type="mobile"
                placeholder="Mobile"
                className="form-control animated fadeInUp mt-2"
                name="mobile"
                value={mobile}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="User Password"
                className="form-control animated fadeInUp mt-2"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <button
                className="btn w-100 float-end btn-primary animated fadeInUp mt-2"
                onClick={() => handleSubmit(userData)}
              >
                Next
              </button>
              <div className="text-center w-100">
                <Link className="text-center" to="/">
                  Sign In
                </Link>
                <br />
                <Link className="text-center" to="/">
                  Forget Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
