import  { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheckCircle, faExclamationTriangle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const HistoryReclamation = () => {
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/indexR", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const filteredData = data.filter(item => item.user_id === user.id);

        setReclamations(filteredData);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderResponseIcon = (response) => {
    if (response === null) {
      return <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" />;
    } else if (response === "") {
      return <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />;
    } else {
      return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="w-full p-5">
      <h2 className="text-center mb-5">Reclamation History</h2>
      <table className="w-full border-collapse mx-auto">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Date Created</th>
            <th className="border p-2 w-1/3">Response</th>
            <th className="border p-2 w-1/6">state of Repore</th>
          </tr>
        </thead>
        <tbody>
          {reclamations.length === 0 ? (
            <tr>
              <td className="border p-2 text-center" colSpan="4">No data available</td>
            </tr>
          ) : (
            reclamations.map((item) => (
              <tr key={item.id}>
                <td className="border p-2 text-center">{item.id}</td>
                <td className="border p-2 text-center">{item.created_at}</td>
                <td className="border p-2 text-center">{item.Responce || "No response"}</td>
                <td className="border p-2 text-center">{renderResponseIcon(item.Responce)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryReclamation;
