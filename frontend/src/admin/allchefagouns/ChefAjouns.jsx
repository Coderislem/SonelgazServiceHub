import React, { useEffect, useState } from 'react';
import DefaultAvatar from '../../assets/avatar.jpg';
import { format, addDays } from 'date-fns';
import TitleAndButton from '../TitleAndButton';
import { TrashIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2'; // Import SweetAlert2
import DeleteConfirem from '../../Modal/DeleteConfirem';

function ChefAjouns() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        // Fetch data from API
        fetch('http://127.0.0.1:8000/api/Allchef')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (Array.isArray(data.createdChafe)) {
                    const filteredData = data.createdChafe.filter(item => item.role === 0);
                    setData(filteredData);
                } else {
                    throw new Error('Data is not an array');
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const sendEmail = (email) => {
        const emailSubject = 'Your email subject';
        const emailBody = 'Your email body';
        window.open(`mailto:${email}?subject=${emailSubject}&body=${emailBody}`);
    };

    const deleteCurrentLead = (id) => {
        setLoading(true)
        fetch(`http://127.0.0.1:8000/api/deleteChafee/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setLoading(false);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Update state to remove deleted item
            setData(prevData => prevData.filter(item => item.id !== id));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this chef?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCurrentLead(id);
                Swal.fire('Deleted!', 'The chef has been deleted.', 'success');
            }
        });
    };

    

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (loading) {
        return (
          <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="loading loading-bars loading-lg"></span>
          </div>
        );
      }
    
    return (
        <>
            <TitleAndButton />
            <div className="divider mt-2"></div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Email</th>
                            <th>Created At</th>
                       
                            <th>Sub mangment</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                {!item.profileImage ? <img src={DefaultAvatar} alt='avatar' /> : <img src={item.profileImage} alt="Avatar" />}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.first_name}</div>
                                            <div className="text-sm opacity-50">{item.last_name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.email}</td>
                                <td>{format(addDays(new Date(item.created_at), -5 * (index + 2)), "dd MMM yy")}</td>
                               
                                <td>{item.Name_Agency}</td>
                                <td>
                                    <button className="btn btn-square btn-ghost" onClick={() => sendEmail(item.email)}>
                                        <EnvelopeIcon className="w-5 text-info" />
                                    </button>
                                    <button className="btn btn-square btn-ghost" onClick={() => confirmDelete(item.id)}>
                                        <TrashIcon className="w-5 text-danger" />
                                    </button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ChefAjouns;
