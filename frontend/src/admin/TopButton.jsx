import React, { useState } from "react";
import Swal from "sweetalert2";
import "./TopButton-style.css";
import ToastNotification from "../Modal/TopNotificaion";
function TopButton() {
  const [loading, setLoading] = useState(false);
  
  const [showToast, setShowToast] = useState(false);

  const [users, setUsers] = useState([]);

    // Function to add a new user to the table
    const addUserToTable = (newUser) => {
      setUsers([...users, newUser]);
    };
    const handleOpenModal = async () => {
        let emailInput;
        let passwordInput;
        let firstNameInput;
        let lastNameInput;
    
        await Swal.fire({
            title: '<span class="text-xl font-bold">New Chef</span>',
            html: `
                <input type="email" id="email" class="swal2-input w-80 mb-2 px-3 py-2 text-sm" placeholder="Email">
                <input type="password" id="password" class="swal2-input w-80 mb-2 px-3 py-2 text-sm" placeholder="Password">
                <input type="text" id="firstName" class="swal2-input w-80 mb-2 px-3 py-2 text-sm" placeholder="First Name">
                <input type="text" id="lastName" class="swal2-input w-80 mb-2 px-3 py-2 text-sm" placeholder="Last Name">
            `,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            showCloseButton: true,
            showConfirmButton: true,
            focusConfirm: false,
            didOpen: () => {
                emailInput = document.getElementById('email');
                passwordInput = document.getElementById('password');
                firstNameInput = document.getElementById('firstName');
                lastNameInput = document.getElementById('lastName');
                emailInput.focus();
                emailInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
                passwordInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
            },
            preConfirm: () => {
                const email = emailInput.value;
                const password = passwordInput.value;
                const firstName = firstNameInput.value;
                const lastName = lastNameInput.value;
                const dateCreated = new Date(); // Corrected line
                if (!email || !password || !firstName || !lastName) {
                    Swal.showValidationMessage('Please enter all fields');
                }
                return { email, password, firstName, lastName, dateCreated }; // Include dateCreated in the returned object
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                const formData = new FormData();
                formData.append('email', result.value.email);
                formData.append('password', result.value.password);
                formData.append('firstName', result.value.firstName);
                formData.append('lastName', result.value.lastName);
                formData.append('dateCreated', result.value.dateCreated); // Use lowercase 'dateCreated'
      
                fetch('http://192.168.8080/api/register', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        setShowToast(true);
                        // Swal.mixin('Success', 'Data sent successfully', 'success');
                    } else {
                        console.error('Failed to send data');
                        Swal.fire('Error', 'Failed to send data', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire('Error', 'An error occurred', 'error');
                })
                .finally(() => {
                    setLoading(false);
                });
            }
        });
    };

    return (
        <div>
            <div className="inline-block float-right">
                <button
                    className="btn px-6 btn-sm normal-case btn-primary text-white"
                    onClick={handleOpenModal}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Add New'}
                </button>
            </div>
            {showToast && (
                <ToastNotification
                    message="add is successfully"
                    type="success"
                />
            )}
        </div>
    );
}

export default TopButton;