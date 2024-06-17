// ProfileImage.jsx
import React from "react";

function ProfileImage({ profileImage, handleFileChange, handleSubmit }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Profile Image</h2>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 mb-4">
            <img
              src={profileImage ? URL.createObjectURL(profileImage) : "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <input
            type="file"
            name="imageProfile"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
