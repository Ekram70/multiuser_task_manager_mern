import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordRequest } from '../../APIrequest/APIrequest';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import { getEmail, getOTP } from '../../helpers/SessionHelper';

const CreatePassword = () => {
  const [resetData, setResetData] = useState({
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  let { password, confirmPassword } = resetData;

  const handleChange = (e) => {
    e.preventDefault();
    setResetData({
      ...resetData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (data) => {
    let { password, confirmPassword } = data;

    if (IsEmpty(password)) {
      ErrorToast('Password Required');
    } else if (IsEmpty(confirmPassword)) {
      ErrorToast('Confirm Password Required');
    } else if (password !== confirmPassword) {
      ErrorToast('Password & Confirm Password Should be Same');
    } else {
      let res = await ResetPasswordRequest(getEmail(), getOTP(), password);

      if (res) {
        navigate('/Login');
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card w-90 p-4">
            <div className="card-body">
              <h4 className="text-center">Set New Password</h4>
              <br />
              <input
                readOnly={true}
                value={getEmail()}
                placeholder="User Email"
                className="form-control animated fadeInUp"
                type="email"
              />
              <br />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="New Password"
                className="form-control animated fadeInUp"
              />
              <br />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="form-control animated fadeInUp"
              />
              <br />
              <button
                onClick={() => handleSubmit(resetData)}
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

export default CreatePassword;
