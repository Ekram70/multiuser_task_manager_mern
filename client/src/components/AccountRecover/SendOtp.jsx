import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerifyEmailRequest } from '../../APIrequest/APIrequest';
import { ErrorToast, IsEmail } from '../../helpers/FormHelper';

const SendOtp = () => {
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!IsEmail(userEmail)) {
      ErrorToast('Valid Email Address Required!');
    } else {
      let res = await VerifyEmailRequest(userEmail);
      if (res) {
        navigate('/VerifyOTP');
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card w-90 p-4">
            <div className="card-body">
              <h4 className="text-center">Email Address</h4>
              <br />
              <input
                type="email"
                value={userEmail}
                onChange={handleChange}
                placeholder="User Email"
                className="form-control animated fadeInUp"
              />
              <br />
              <button
                onClick={handleSubmit}
                className="btn w-100 animated fadeInUp float-end btn-primary"
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;
