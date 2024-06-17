import React, { useState, useEffect } from "react";
import axios from "axios";
import ToastNotification from "../../Modal/TopNotificaion";

const NewProblemReport = () => {
  const [image, setImage] = useState(null);
  const [counters, setCounters] = useState([]);
  const [problemTypes, setProblemTypes] = useState([]);
  const [selectedCounter, setSelectedCounter] = useState("");
  const [selectedProblemType, setSelectedProblemType] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get("http://127.0.0.1:8000/api/AllNC", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Filter the counters based on user ID
        const filteredCounters = response.data.filter(
          (counter) => counter.user_id === user.id
        );
        setCounters(filteredCounters);
      })
      .catch((error) => {
        console.error("Error fetching counters:", error);
        setError("Failed to fetch counters");
      });

    axios
      .get("http://127.0.0.1:8000/api/allTipR", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProblemTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching problem types:", error);
        setError("Failed to fetch problem types");
      });
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCounterChange = (e) => {
    setSelectedCounter(e.target.value);
  };

  const handleProblemTypeChange = (e) => {
    setSelectedProblemType(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("nombreCompteurs", selectedCounter);
    formData.append("type_reclamation", selectedProblemType);
    formData.append("description", description);

    axios
      .post("http://127.0.0.1:8000/api/storeR", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccess("Problem report submitted successfully");
        setError("");
        setTimeout(() => {
          setSuccess(""); // Reset success message after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        console.error("Error submitting problem report:", error);
        setError("Failed to submit problem report");
        setSuccess("");
      });
  };

  return (
    <>
      {success && <ToastNotification message="Problem Report added successfully" type="success" />}
      {error && <ToastNotification message={error} type="error" />} {/* Display error message */}
      <div className="flex justify-center items-center h-screen">
        <form
          className="w-full max-w-md p-6 -mt-24 bg-white shadow-md rounded-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
            New Problem Report
          </h1>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="counter-options">
              Number of Counters:
            </label>
            <select
              className="w-full py-2 px-4 border border-gray-300 rounded"
              id="counter-options"
              value={selectedCounter}
              onChange={handleCounterChange}
            >
              <option value="">Select an option</option>
              {counters.map((counter) => (
                <option key={counter.id} value={counter.id}>
                  {counter.nombreCompteurs}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="problem-type">
              Type of Problem:
            </label>
            <select
              className="w-full py-2 px-4 border border-gray-300 rounded"
              id="problem-type"
              value={selectedProblemType}
              onChange={handleProblemTypeChange}
            >
              <option value="">Select a problem type</option>
              {problemTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type_reclamation}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              className="w-full py-2 px-4 border border-gray-300 rounded"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewProblemReport;
