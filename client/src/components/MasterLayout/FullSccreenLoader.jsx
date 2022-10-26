import React from 'react';

const FullSccreenLoader = () => {
  return (
    <>
      <div className={'LoadingOverlay'}>
        <div className="Line-Progress">
          <div className="indeterminate"></div>
        </div>
      </div>
    </>
  );
};

export default FullSccreenLoader;
