const TasksModel = require('../models/TasksModel');

const createTask = (req, res) => {
  const reqBody = req.body;
  reqBody.email = req.headers['email'];
  TasksModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: 'fail', data: err });
    } else {
      res.status(200).json({ status: 'success', data: data });
    }
  });
};

const deleteTask = (req, res) => {
  const id = req.params.id;
  const Query = { _id: id };

  TasksModel.remove(Query, (err, data) => {
    if (err) {
      res.status(400).json({ status: 'fail', data: err });
    } else {
      res.status(200).json({ status: 'success', data: data });
    }
  });
};

const updateTaskStatus = (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  const Query = { _id: id };
  const reqBody = { status: status };

  TasksModel.updateOne(Query, reqBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: 'fail', data: err });
    } else {
      res.status(200).json({ status: 'success', data: data });
    }
  });
};

const listTasksByStatus = (req, res) => {
  const status = req.params.status;
  const email = req.headers['email'];

  TasksModel.aggregate(
    [
      { $match: { status: status, email: email } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createdOn: {
            $dateToString: {
              date: '$createdOn',
              format: '%d-%m-%Y',
            },
          },
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(400).json({ status: 'fail', data: err });
      } else {
        res.status(200).json({ status: 'success', data: data });
      }
    }
  );
};

const taskStatusCount = (req, res) => {
  const email = req.headers['email'];

  TasksModel.aggregate(
    [
      { $match: { email: email } },
      { $group: { _id: '$status', sum: { $count: {} } } },
    ],
    (err, data) => {
      if (err) {
        res.status(400).json({ status: 'fail', data: err });
      } else {
        res.status(200).json({ status: 'success', data: data });
      }
    }
  );
};

module.exports = {
  createTask,
  deleteTask,
  updateTaskStatus,
  listTasksByStatus,
  taskStatusCount,
};
