import React, { useState, useEffect } from "react";
import axios from "axios";
import Pdficon from "../../assets/pdfIcon.png";
import MapWithMarker from "../../components/GuelmaMap";
import ToastNotification from "../../Modal/TopNotificaion";

function Domande() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [address, setAddress] = useState("");
  const [agencies, setAgencies] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Energy: "",
    name_Agency: "",
    statistical_identification_number: "",
    phone: "",
    the_neture_of_the_place_of_arrest: "",
  });
  const [mapCenter, setMapCenter] = useState([36.468578009958925, 7.425384521484375]); // Default center

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "name_Agency") {
      const selectedAgency = agencies.find(agency => agency.Name_Agency === value);
      if (selectedAgency && selectedAgency.Adresse) {
        const [lat, lng] = selectedAgency.Adresse.split(',').map(Number);
        setMapCenter([lat, lng]);
      } else {
        setMapCenter([36.468578009958925, 7.425384521484375]); // Default center if no address
      }
    }
  };

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/AllAgenc');
        const data = response.data;

        if (Array.isArray(data)) {
          setAgencies(data);
        } else {
          console.error('API response is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };

    fetchAgencies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("name_Agency", formData.name_Agency || '');
    form.append("Document", selectedFile);
    form.append("Energy", formData.Energy || '');
    form.append("Address", address || '');
    form.append("phone", formData.phone || '');
    form.append("statistical_identification_number", formData.statistical_identification_number || '');
    form.append("the_neture_of_the_place_of_arrest", formData.the_neture_of_the_place_of_arrest || '');
    form.append("state_demande", 'in progress');

    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post("http://127.0.0.1:8000/api/storeD", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting the form:", error.response ? error.response.data : error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      {success && <ToastNotification message="Domande added successfully" type="success" />}
      <div className="w-full mx-auto p-6 bg-white mt-4 shadow-lg rounded-lg">
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          <h1 className="text-2xl font-bold text-center mb-4">Service Request</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-6">
                <label htmlFor="Energy" className="block text-sm font-medium text-gray-700">
                  Select the Service
                </label>
                <select
                  id="Energy"
                  name="Energy"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleInputChange}
                  value={formData.Energy}
                >
                  <option value="">Select Energy Service</option>
                  <option value="gaz">Gaz</option>
                  <option value="electronic">Electronic</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="name_Agency" className="block text-sm font-medium text-gray-700">
                  Sub-Management
                </label>
                <select
                  id="name_Agency"
                  name="name_Agency"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleInputChange}
                  value={formData.name_Agency}
                >
                  <option value="">Select Sub-Management</option>
                  {agencies.map((agency) => (
                    <option key={agency.id} value={agency.Name_Agency}>
                      {agency.Name_Agency}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6 col-span-1">
                <label htmlFor="the_neture_of_the_place_of_arrest" className="block text-sm font-medium text-gray-700">
                  Nature of the Place of Arrest
                </label>
                <input
                  type="text"
                  id="the_neture_of_the_place_of_arrest"
                  name="the_neture_of_the_place_of_arrest"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md placeholder-gray-400"
                  placeholder="e.g. Office, Residence, etc."
                  onChange={handleInputChange}
                  value={formData.the_neture_of_the_place_of_arrest}
                />
              </div>
              <div className="mb-6 col-span-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md placeholder-gray-400"
                  placeholder="Phone number"
                  onChange={handleInputChange}
                  value={formData.phone}
                />
              </div>
              <div className="mb-6 col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <MapWithMarker setAddress={handleAddressChange} center={mapCenter} />
              </div>
              <div className="mb-6 col-span-1">
                <label htmlFor="statistical_identification_number" className="block text-sm font-medium text-gray-700">
                  Statistical Identification Number
                </label>
                <input
                  type="text"
                  id="statistical_identification_number"
                  name="statistical_identification_number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md placeholder-gray-400"
                  placeholder="Enter Stat Number"
                  onChange={handleInputChange}
                  value={formData.statistical_identification_number}
                />
              </div>
              <div className="mb-6 col-span-1">
                <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
                  Upload (National ID, Residence certificate, rent contract, Building Permit, Real estate booklet, Written request) in PDF
                </label>
                <div className="mt-1 flex items-center">
                  <label
                    htmlFor="fileUpload"
                    className="px-4 py-2 bg-blue-500 text-white border-none rounded-md cursor-pointer"
                  >
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    name="Document"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {selectedFile && (
                  <div className="mt-2 flex items-center">
                    <img src={Pdficon} alt="PDF Icon" className="w-14 h-14 mr-2" />
                    <span>{selectedFile.name}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white border-none rounded-md cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Domande;
