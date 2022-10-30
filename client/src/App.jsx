import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import FullSccreenLoader from './components/MasterLayout/FullSccreenLoader';
import { getToken } from './helpers/SessionHelper';
import CreatePasswordPage from './pages/AcccountRecover/CreatePasswordPage';
import SendOtpPage from './pages/AcccountRecover/SendOtpPage';
import VerifyOtpPage from './pages/AcccountRecover/VerifyOtpPage';
import CancelledPage from './pages/CancelledPage';
import CompletedPage from './pages/CompletedPage';
import CreatePage from './pages/CreatePage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import NewPage from './pages/NewPage';
import Page404 from './pages/Page404';
import ProfilePage from './pages/ProfilePage';
import ProgressPage from './pages/ProgressPage';
import RegistrationPage from './pages/RegistrationPage';

const App = () => {
  if (getToken()) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<DashboardPage />} />
            <Route exact path="/Create" element={<CreatePage />} />
            <Route exact path="/Progress" element={<ProgressPage />} />
            <Route exact path="/Completed" element={<CompletedPage />} />
            <Route exact path="/Cancelled" element={<CancelledPage />} />
            <Route exact path="/New" element={<NewPage />} />
            <Route exact path="/Profile" element={<ProfilePage />} />
            <Route exact path="/Login" element={<Navigate to="/" replace />} />
            <Route
              exact
              path="/Registration"
              element={<Navigate to="/" replace />}
            />
            <Route
              exact
              path="/ForgetPass"
              element={<Navigate to="/" replace />}
            />
            <Route exact path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullSccreenLoader />
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/Create" element={<Navigate to="/login" replace />} />
            <Route
              path="/Progress"
              element={<Navigate to="/login" replace />}
            />
            <Route
              path="/Completed"
              element={<Navigate to="/login" replace />}
            />
            <Route
              path="/Cancelled"
              element={<Navigate to="/login" replace />}
            />
            <Route path="/New" element={<Navigate to="/login" replace />} />
            <Route path="/Profile" element={<Navigate to="/login" replace />} />
            <Route exact path="/Login" element={<LoginPage />} />
            <Route exact path="/Registration" element={<RegistrationPage />} />
            <Route exact path="/SendOtp" element={<SendOtpPage />} />
            <Route exact path="/VerifyOtp" element={<VerifyOtpPage />} />
            <Route
              exact
              path="/CreatePassword"
              element={<CreatePasswordPage />}
            />
            <Route exact path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullSccreenLoader />
      </>
    );
  }
};

export default App;
