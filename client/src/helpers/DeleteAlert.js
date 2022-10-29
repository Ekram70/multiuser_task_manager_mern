import Swal from 'sweetalert2';
import { DeleteRequest } from '../APIrequest/APIrequest';

const DeleteTodo = (idx) => {
  return Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      return DeleteRequest(idx);
    }
  });
};

export default DeleteTodo;
