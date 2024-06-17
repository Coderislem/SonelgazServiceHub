import React, { useEffect, useState } from 'react';
import { DocumentCheckIcon, ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocation, faFilePdf, faUser } from '@fortawesome/free-solid-svg-icons';
import MapAddress from '../components/MapAddress'; // Import the MapAddress component
import Swal from 'sweetalert2';
import "../components/MapModelAdress.css";
import ToastNotification from '../Modal/TopNotificaion';
import UserDetailsModal from './UserDetailsModal'; // Import UserDetailsModal component

function LesDomonde() {
  const [data, setData] = useState([]);  // Initialize as an empty array
  const [showMap, setShowMap] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // State to store the selected user

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/api/indexD", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setLoading(false);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (result.demonde && Array.isArray(result.demonde)) {
          setData(result.demonde);
        } else {
          console.error("API response does not contain an array in 'demonde':", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error here
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options).replace(/\//g, '-');
  };

  const handleDocumentDownload = (documentPath) => {
    const url = `http://127.0.0.1:8000/storage/${documentPath}`;
    window.open(url, '_blank');
  };

  const toggleMap = (address) => {
    if (address.includes(',')) {
      setSelectedAddress(address);
      setShowMap(true);
    } else {
      console.error("Invalid address format: ", address);
    }
  };

  const openUserModal = (userId) => {
    setSelectedItem(userId); // Set the selected user ID
  };

  const closeUserModal = () => {
    setSelectedItem(null); // Close the modal by resetting the selected user
  };

  const closeMap = () => {
    setShowMap(false);
    setSelectedAddress('');
  };

  const confirmAndUpdateState = (id, newState) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateState(id, newState);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const updateState = async (id, newState) => {
    const token = localStorage.getItem("token");
    const url = `http://127.0.0.1:8000/api/updateDemond/${id}`;
    const payload = { state_demande: newState };

    console.log("Updating state with payload:", payload);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      setSuccess(true);
      const result = await response.json();
      console.log("Update successful:", result);

      setData(prevData =>
        prevData.map(item => (item.id === id ? { ...item, state_demande: newState } : item))
      );
      setSuccess(true);
    } catch (error) {
      console.error("Error updating state:", error);
      // Handle error here
    } finally {
      setSuccess(false); // Reset success state regardless of success or failure
    }
  };

  // Get Name_Agency from local storage
  const chafAjence = JSON.parse(localStorage.getItem('chafAjence'));
  const storedAgencyName = chafAjence ? chafAjence.Name_Agency : '';

  const filteredData = data
    .filter(item => item.state_demande === "in progress")
    .filter(item => item.id.toString().includes(searchQuery.toLowerCase()))
    .filter(item => item.name_Agency === storedAgencyName); // Filter by Name_Agency

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (loading) {
    return (
      <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  return (
    <>
      {success && <ToastNotification message="State updated successfully" type="success" />}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-semibold text-left rtl:text-right text-gray-900">Service Requests</h1>
          <input
            type="text"
            placeholder="Search by ID..."
            className="w-48 p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3">Create at</th>
              <th scope="col" className="px-6 py-3">NOPA</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">SIN</th>
              <th scope="col" className="px-6 py-3">Address</th>
              <th scope="col" className="px-6 py-3">Document</th>
              <th scope="col" className="px-6 py-3 text-center">State</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900">{item.id}</th>
                <td className="px-6 py-4">{item.Energy}</td>
                <td className="px-6 py-4">{formatDate(item.created_at)}</td>
                <td className="px-6 py-4">{item.the_neture_of_the_place_of_arrest}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.statistical_identification_number}</td>
                <td className="px-6 py-4">
                  <FontAwesomeIcon
                    icon={faMapLocation}
                    className='h-6 w-6 cursor-pointer text-gray-500 transition-transform transform hover:scale-110'
                    onClick={() => toggleMap(item.Address)}
                  />
                </td>
                <td className="px-6 py-4 ">
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    className='h-5 w-5 cursor-pointer mr-3'
                    onClick={() => handleDocumentDownload(item.Document)}
                  />
                  <FontAwesomeIcon
                    icon={faUser}
                    className='h-5 w-5 cursor-pointer text-gray-500 transition-transform transform hover:scale-110'
                    onClick={() => openUserModal(item.user_id)} // Assuming the user object is nested within the item object
                  />
                </td>
                <td className="px-6 py-4 flex justify-around">
                  <DocumentCheckIcon
                    className='h-6 w-6 text-success cursor-pointer hover:scale-110'
                    onClick={() => confirmAndUpdateState(item.id, 'Accepted')}
                  />
                  <ArchiveBoxXMarkIcon
                    className='h-6 w-6 text-error cursor-pointer hover:scale-110'
                    onClick={() => confirmAndUpdateState(item.id, 'Rejected')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <div className="join">
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`join-item btn btn-xs ${currentPage === number ? 'btn-active' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      {showMap && (
        <div className="modal-overlay">
          <div className="modal-content">
            <MapAddress address={selectedAddress} />
            <button className="modal-close" onClick={closeMap}>Close</button>
          </div>
        </div>
      )}
      {selectedItem && (
        <UserDetailsModal userId={selectedItem} closeModal={closeUserModal} /> // Pass userId as a prop to UserDetailsModal
      )}
    </>
  );
}

export default LesDomonde;
