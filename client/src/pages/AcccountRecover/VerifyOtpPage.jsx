import React, { lazy, Suspense } from 'react';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
const VerifyOtp = lazy(() =>
  import('../../components/AccountRecover/VerifyOtp')
);
const VerifyOtpPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <VerifyOtp />
    </Suspense>
  );
};

export default VerifyOtpPage;
