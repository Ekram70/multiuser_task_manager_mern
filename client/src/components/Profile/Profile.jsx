import React, { useEffect, useState } from 'react';
import {
  GetProfileDetails,
  ProfileUpdateRequest,
} from '../../APIrequest/APIrequest';
import {
  ErrorToast,
  getBase64,
  IsEmail,
  IsEmpty,
  IsMobile,
} from '../../helpers/FormHelper';

const Profile = () => {
  const [userData, setUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    mobile: '',
    password: '',
    photo: '',
  });

  useEffect(() => {
    GetProfileDetails().then((res) => {
      setUserData(res);
    });
  }, []);

  let { email, firstName, lastName, mobile, password, photo } = userData;

  const PreviewImage = (e) => {
    let imageFile = e.target.files[0];
    getBase64(imageFile).then((base64Img) => {
      setUserData({
        ...userData,
        photo: base64Img,
      });
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (data) => {
    const { email, firstName, lastName, mobile, password, photo } = data;
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
      let res = await ProfileUpdateRequest(
        email,
        firstName,
        lastName,
        mobile,
        password,
        photo
      );

      if (res) {
        window.location.reload();
      }
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <img src={photo} alt="profile" className="icon-nav-img" />
                <hr />
                <div className="row">
                  <div className="col-4 p-2">
                    <label>Profile Picture</label>
                    <input
                      onChange={(e) => {
                        handleChange(e);
                        PreviewImage(e);
                      }}
                      name="photo"
                      type="file"
                      placeholder="User Photo"
                      className="form-control animated fadeInUp"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      readOnly={true}
                      className="form-control animated fadeInUp"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                      className="form-control animated fadeInUp"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                      className="form-control animated fadeInUp"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Mobile</label>
                    <input
                      type="mobile"
                      name="mobile"
                      value={mobile}
                      onChange={handleChange}
                      className="form-control animated fadeInUp"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      className="form-control animated fadeInUp"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <button
                      onClick={() => handleSubmit(userData)}
                      className="btn w-100 float-end btn-primary animated fadeInUp"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
