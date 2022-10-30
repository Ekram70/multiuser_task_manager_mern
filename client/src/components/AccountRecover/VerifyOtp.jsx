import React, { useState } from 'react';
import ReactcodeInput from 'react-code-input';
import { useNavigate } from 'react-router-dom';
import { VerifyOtpRequest } from '../../APIrequest/APIrequest';
import { ErrorToast } from '../../helpers/FormHelper';
import { getEmail } from '../../helpers/SessionHelper';

const VerifyOtp = () => {
  const [OTP, setOTP] = useState('');

  let defaultInputStyle = {
    fontFamily: 'monospace',
    MozAppearance: 'textfield',
    margin: '4px',
    paddingLeft: '8px',
    width: '45px',
    borderRadius: '3px',
    height: '45px',
    fontSize: '32px',
    border: '1px solid lightskyblue',
    boxSizing: 'border-box',
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    textAlign: 'center',
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (OTP.length === 6) {
      let res = await VerifyOtpRequest(getEmail(), OTP);
      if (res) {
        navigate('/CreatePassword');
      }
    } else {
      ErrorToast('Enter 6 Digit Code');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card w-90 p-4">
            <div className="card-body">
              <h4 className="text-center">OTP Verification</h4>
              <p className="text-center">
                A 6 digit Verification code has been sent to your email address
              </p>
              <ReactcodeInput
                className="text-center w-100"
                onChange={(value) => setOTP(value)}
                inputStyle={defaultInputStyle}
                fields={6}
              />
              <br />
              <br />
              <button
                onClick={handleSubmit}
                className="btn w-100 animated fadeInUp float-end btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
