import React, { lazy, Suspense } from 'react';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
const SendOtp = lazy(() => import('../../components/AccountRecover/SendOtp'));

const SendOtpPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <SendOtp />
    </Suspense>
  );
};

export default SendOtpPage;
