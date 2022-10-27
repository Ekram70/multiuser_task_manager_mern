import axios from 'axios';
import { ErrorToast, SuccessToast } from '../helpers/FormHelper';
import { HideLoader, ShowLoader } from '../redux/state-slice/settingsSlice';
import store from '../redux/store/store';

const BASEURL = 'http://localhost:5000/api/v1';

const RegistrationRequest = async (
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) => {
  store.dispatch(ShowLoader());

  let URL = `${BASEURL}/registration`;
  let postBody = JSON.stringify({
    email,
    firstName,
    lastName,
    mobile,
    password,
    photo,
  });

  let res = await axios
    .post(URL, postBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        if (res.data['status'] === 'fail') {
          if (res.data['data']['keyPattern']['email'] === 1) {
            ErrorToast('Email Aready Exist!');
            return false;
          } else {
            ErrorToast('Something went wrong!');
            return false;
          }
        } else {
          SuccessToast('Registration Successfull');
          return true;
        }
      } else {
        ErrorToast('Something went wrong!');
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast('Something went wrong!');
      return false;
    });

  return res;
};

export { RegistrationRequest };
