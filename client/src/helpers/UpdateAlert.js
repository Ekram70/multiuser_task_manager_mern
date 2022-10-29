import Swal from 'sweetalert2';
import { UpdateStatusRequest } from '../APIrequest/APIrequest';

const UpdateTodo = (idx) => {
  return Swal.fire({
    title: 'Change Status',
    input: 'select',
    inputOptions: {
      New: 'New',
      Progress: 'Progress',
      Completed: 'Completed',
      Cancelled: 'Cancelled',
    },
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      return UpdateStatusRequest(idx, result.value);
    }
  });
};

export default UpdateTodo;
