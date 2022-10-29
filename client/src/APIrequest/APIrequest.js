import axios from 'axios';
import { ErrorToast, SuccessToast } from '../helpers/FormHelper';
import { getToken, setToken, setUserDetails } from '../helpers/SessionHelper';
import { HideLoader, ShowLoader } from '../redux/state-slice/settingsSlice';
import { setSummary } from '../redux/state-slice/summarySlice';
import {
  setCancelledtask,
  setCompletedTask,
  setNewTask,
  setProgressTask,
} from '../redux/state-slice/taskSlice';
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
          setToken(res.data['token']);
          setUserDetails(res.data['data']);
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

const LoginRequest = async (email, password) => {
  store.dispatch(ShowLoader());

  let URL = `${BASEURL}/login`;

  let postBody = JSON.stringify({
    email,
    password,
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
        if (res.data['token']) {
          setToken(res.data['token']);
          setUserDetails(res.data['data']);
          SuccessToast('Login Successfull');
          return true;
        } else {
          ErrorToast('Invalid Email or Password!');
          return false;
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

const NewTaskRequest = async (title, description) => {
  store.dispatch(ShowLoader());
  let URL = `${BASEURL}/createTask`;

  let postBody = JSON.stringify({
    title,
    description,
    status: 'New',
  });

  let res = await axios
    .post(URL, postBody, {
      headers: {
        'Content-Type': 'application/json',
        token: getToken(),
      },
    })
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        SuccessToast('New Task Created');
        return true;
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

const TaskListByStatus = (status) => {
  store.dispatch(ShowLoader());
  let URL = `${BASEURL}/listTaskByStatus/${status}`;

  axios
    .get(URL, {
      headers: {
        token: getToken(),
      },
    })
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        if (status === 'New') {
          store.dispatch(setNewTask(res.data['data']));
        } else if (status === 'Completed') {
          store.dispatch(setCompletedTask(res.data['data']));
        } else if (status === 'Cancelled') {
          store.dispatch(setCancelledtask(res.data['data']));
        } else if (status === 'Progress') {
          store.dispatch(setProgressTask(res.data['data']));
        }
        return true;
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
};

const SummaryRequest = () => {
  store.dispatch(ShowLoader());
  let URL = `${BASEURL}/taskStatusCount`;

  axios
    .get(URL, {
      headers: {
        token: getToken(),
      },
    })
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        store.dispatch(setSummary(res.data['data']));
      } else {
        ErrorToast('Something Went Wrong');
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast('Something Went Wrong');
    });
};

const DeleteRequest = (id) => {
  store.dispatch(ShowLoader());
  let URL = `${BASEURL}/deleteTask/${id}`;

  return axios
    .get(URL, {
      headers: {
        token: getToken(),
      },
    })
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        SuccessToast('Delete Successful');
        return true;
      } else {
        ErrorToast('Something Went Wrong');
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast('Something Went Wrong');
      return false;
    });
};

const UpdateStatusRequest = (id, status) => {
  store.dispatch(ShowLoader());
  let URL = `${BASEURL}/updateTask/${id}/${status}`;

  return axios
    .get(URL, {
      headers: {
        token: getToken(),
      },
    })
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        SuccessToast('Status Updated');
        return true;
      } else {
        ErrorToast('Something Went Wrong');
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast('Something Went Wrong');
      return false;
    });
};

export {
  RegistrationRequest,
  LoginRequest,
  NewTaskRequest,
  TaskListByStatus,
  SummaryRequest,
  DeleteRequest,
  UpdateStatusRequest,
};
