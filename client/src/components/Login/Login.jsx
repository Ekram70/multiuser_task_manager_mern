import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
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
                />
                <input
                  type="password"
                  placeholder="Use Password"
                  className="form-control animated fadeInUp mt-2"
                />
                <button className="btn w-100 animated fadeInUp float-end btn-primary mt-2">
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
                  <Link
                    className="text-center animated fadeInUp"
                    to="/ForgetPass"
                  >
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
