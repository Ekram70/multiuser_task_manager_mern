const express = require('express');
const router = express.Router();

const AuthVerify = require('../middleware/AuthVerifyMiddleware');
const {
  registration,
  profileUpdate,
  login,
  profileDetails,
} = require('../controllers/UsersController');

const {
  createTask,
  updateTaskStatus,
  listTasksByStatus,
  taskStatusCount,
  deleteTask,
} = require('../controllers/TasksController');

router.post('/registration', registration);
router.post('/login', login);
router.post('/profileUpdate', AuthVerify, profileUpdate);
router.get('/profileDetails', AuthVerify, profileDetails);

router.post('/createtask', AuthVerify, createTask);
router.get('/updateTask/:id/:status', AuthVerify, updateTaskStatus);
router.get('/deleteTask/:id/', AuthVerify, deleteTask);
router.get('/listTaskByStatus/:status', AuthVerify, listTasksByStatus);
router.get('/taskStatusCount', AuthVerify, taskStatusCount);

module.exports = router;
