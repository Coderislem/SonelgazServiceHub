import React, { useState } from 'react';
import { CameraIcon, MicrophoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import './formreaclamation-style.css';

function FormReclamation({ setShowForm }) {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [voiceFile, setVoiceFile] = useState(null);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  const handleVoiceFileChange = (e) => {
    const file = e.target.files[0];
    setVoiceFile(file);
  };

  const handleSubmit = () => {
    // Here you can send the reclamation data (description, images, voiceFile) to your backend or perform any other necessary actions
    console.log("Description:", description);
    console.log("Images:", images);
    console.log("Voice File:", voiceFile);

    // Reset form fields after submission
    setDescription('');
    setImages([]);
    setVoiceFile(null);
    setShowForm(false);
  };

  return (
    <div id='modal-overlay'>
      <div className="p-6 bg-white rounded-lg shadow-lg" style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255, 255, 255)",
        zIndex: "999",
        padding: "20px",
        borderRadius: "8px",
        width: '400px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <h2 className="text-lg font-semibold mb-4">Send Reclamation</h2>
          <button onClick={() => setShowForm(false)}><XMarkIcon className="w-6 h-6 text-gray-600" /></button>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="w-full h-24 mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Type your problem description..."
          ></textarea>
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="image" className="mr-2 cursor-pointer">
            <CameraIcon className="w-6 h-6 text-gray-600" />
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} multiple className="hidden" />
          </label>
          <span className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
            Upload Image (up to 5)
          </span>
        </div>
        <div className="flex space-x-2 mb-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Uploaded Image ${index}`}
              className="w-20 h-20 object-cover rounded-md border border-gray-300"
            />
          ))}
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="voiceFile" className="mr-2 cursor-pointer">
            <MicrophoneIcon className="w-6 h-6 text-gray-600" />
            <input type="file" id="voiceFile" accept="audio/*" onChange={handleVoiceFileChange} className="hidden" />
          </label>
          <span className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
            Upload Voice File
          </span>
        </div>
        <button onClick={handleSubmit} className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Submit
        </button>
      </div>
    </div>
  );
}

export default FormReclamation;