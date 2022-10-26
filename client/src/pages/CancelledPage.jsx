import React, { lazy, Suspense } from 'react';
import LazyLoader from '../components/MasterLayout/LazyLoader';
import MasterLayout from '../components/MasterLayout/MasterLayout';
const Cancelled = lazy(() => import('../components/Cancelled/Cancelled'));

const CancelledPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Cancelled />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default CancelledPage;
