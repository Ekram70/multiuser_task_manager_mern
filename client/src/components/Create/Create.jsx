import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NewTaskRequest } from '../../APIrequest/APIrequest';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';

const Create = () => {
  const [taskData, setTaskData] = useState({
    task: '',
    description: '',
  });

  let { task, description } = taskData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (data) => {
    const { task, description } = data;

    if (IsEmpty(task)) {
      ErrorToast('Task Name Required!');
    } else if (IsEmpty(description)) {
      ErrorToast('Description Required!');
    } else {
      let res = await NewTaskRequest(task, description);
      if (res) {
        navigate('/new');
      }
    }
  };

  return (
    <Container fluid={true} className="content-body">
      <Row className="d-flex justify-content-center">
        <div className="col-12 col-lg-8 col-sm-12 col-md-8 p-2">
          <div className="card">
            <div className="card-body">
              <h4>Create New</h4>
              <input
                type="text"
                placeholder="Task Name"
                className="form-control animated fadeInUp mt-2"
                name="task"
                value={task}
                onChange={handleChange}
              />
              <textarea
                rows={5}
                placeholder="Task Description"
                className="form-control animated fadeInUp mt-2"
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
              />
              <button
                className="btn float-end btn-primary mt-2"
                onClick={() => handleSubmit(taskData)}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Create;
