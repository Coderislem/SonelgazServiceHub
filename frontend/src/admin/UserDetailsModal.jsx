import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
function UserDetailsModal({ userId, closeModal }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
        const userData = response.data;
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();

    return () => {
      // Cleanup function
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl p-8">
          <p className="text-gray-800">Loading...</p>
        </div>
      </div>
    );
  }

  const handleEmailClick = () => {
    // Add logic to send an email
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">User Details</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center mb-6">
          {userData && (
            <img src={`http://127.0.0.1:8000/storage/${userData.imageProfile}`} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          )}
        </div>
        {userData && (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <span className="text-gray-600 font-medium mr-2">First Name:</span>
              <span className="text-gray-800">{userData.first_name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 font-medium mr-2">Last Name:</span>
              <span className="text-gray-800">{userData.last_name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 font-medium mr-2">Email:</span>
              <span className="text-gray-800">{userData.email}</span>
              <button className="ml-2" onClick={handleEmailClick}>
              <FontAwesomeIcon
                    icon={faPaperPlane}
                    className='h-6 w-6 cursor-pointer text-gray-500 transition-transform transform hover:scale-110'
                    onClick={() => openUserModal(item.user_id)} // Assuming the user object is nested within the item object
                  />
              </button>
            </div>
            {/* Add other user information fields as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetailsModal;
