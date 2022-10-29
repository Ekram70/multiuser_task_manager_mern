import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SummaryRequest } from '../../APIrequest/APIrequest';

const Dashboard = () => {
  useEffect(() => {
    SummaryRequest();
  }, []);

  const summaryList = useSelector((state) => state.summary.value);

  return (
    <>
      <div className="container">
        <div className="row">
          {summaryList.map((item, idx) => (
            <div key={idx} className="col-12 col-lg-3 col-sm-6 col-md-3 p-2">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="animated fadeInUp">Total {item._id}</h5>
                  <h6 className="text-secondary animated fadeInUp">
                    {item.sum}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
