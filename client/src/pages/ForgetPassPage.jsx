import React, { lazy, Suspense } from 'react';
import LazyLoader from '../components/MasterLayout/LazyLoader';
const ForgetPass = lazy(() => import('../components/ForgetPass/ForgetPass'));

const ForgetPassPage = () => {
  return (
    <div>
      <Suspense fallback={<LazyLoader />}>
        <ForgetPass />
      </Suspense>
    </div>
  );
};

export default ForgetPassPage;
