import React, { useState } from "react";
import MapWithMarker from "./GuelmaMap";
import ToastNotification from "../Modal/TopNotificaion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function CreateAjounse() {
  const [mapCenter, setMapCenter] = useState([36.468578009958925, 7.425384521484375]); // Default center

  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name_Ajouns: "",
  });

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const data = {
      Name_Agency: formData.name_Ajouns,
      Adresse: address,
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/createAgenc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        // Ajounse created successfully
        setSuccess(true);
      } else {
        // Handle error
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
      </div>
    );
  }

  return (
    <>
      {success && <ToastNotification message="Ajounse created successfully" type="success" />}
      <div className="max-w-4xl  mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Create Sub-managment</h1>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="name_Ajouns" className="block text-lg font-medium mb-2">
                Name Sub-Managment
                </label>
                <input
                  type="text"
                  id="name_Ajouns"
                  name="name_Ajouns"
                  placeholder="Enter Name Sub-Managment"
                  onChange={handleInputChange}
                  value={formData.name_Ajouns}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="block text-lg font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Please select address from map"
                  value={address}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="w-full h-64 md:h-full ml-1 rounded" >
              <MapWithMarker setAddress={handleAddressChange} center={mapCenter} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAjounse;