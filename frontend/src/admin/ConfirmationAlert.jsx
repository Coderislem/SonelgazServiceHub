import React from 'react';
import Swal from 'sweetalert2';

const ConfirmationAlert = ({ onConfirm }) => {
  const showAlert = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <button onClick={showAlert} className="h-6 w-6 text-success cursor-pointer hover:scale-110">
      Confirm
    </button>
  );
};

export default ConfirmationAlert;
