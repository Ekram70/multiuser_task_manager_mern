import React, { lazy, Suspense } from 'react';
import LazyLoader from '../components/MasterLayout/LazyLoader';
import MasterLayout from '../components/MasterLayout/MasterLayout';
const Registration = lazy(() =>
  import('../components/Regsitration/Registration')
);

const RegistrationPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Registration />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default RegistrationPage;
