import React from "react";
import Swal from "sweetalert2";
import { TrashIcon ,} from '@heroicons/react/24/outline';
const DeleteConfirem = () => {
  const showAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
   
      <button onClick={showAlert} className="btn btn-square btn-ghost">
        <TrashIcon className="w-5 text-red-500" />
      </button>
   
  );
};

export default DeleteConfirem;
