import React, { useState, useEffect } from "react";
import "./HIstoryDomonde.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCheckCircle,
  faTimesCircle,
  faBolt,
  faFire,
  faFilter,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

function HistoryDomonde() {
  const [historyData, setHistoryData] = useState([]);
  const [sortType, setSortType] = useState("none");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/indexD", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Access the 'demonde' property of the response
        const filteredData = data.demonde
          .filter(item => item.user_id === JSON.parse(localStorage.getItem('user')).id) // Filter by user_id
          .map((item) => ({
            id: item.id,
            createdAt: item.created_at,
            type: item.Energy, // Rename Energy to type
            state: item.state_demande, // Rename state_demande to state
            document: item.Document, // Include the Document field
          }));

        setHistoryData(filteredData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sortData = () => {
    let sortedData;
    if (sortType === "none" || sortType === "desc") {
      sortedData = [...historyData].sort((a, b) =>
        a.type.localeCompare(b.type)
      );
      setSortType("asc");
    } else {
      sortedData = [...historyData].sort((a, b) =>
        b.type.localeCompare(a.type)
      );
      setSortType("desc");
    }
    setHistoryData(sortedData);
  };

  const renderStateIcon = (state) => {
    switch (state.toLowerCase()) {
      case "in progress":
        return (
          <FontAwesomeIcon
            icon={faSpinner}
            className="state-icon in-progress"
          />
        );
      case "accepted":
        return (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="state-icon accepted"
          />
        );
      case "rejected":
        return (
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="state-icon rejected"
          />
        );
      default:
        return null;
    }
  };

  const renderTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "gaz":
        return <FontAwesomeIcon icon={faFire} className="type-icon gas" />;
      case "electrinic":
        return <FontAwesomeIcon icon={faBolt} className="type-icon electric" />;
      default:
        return null;
    }
  };

  const handleViewDocument = (base64String) => {
    const linkSource = `data:application/pdf;base64,${base64String}`;
    const downloadLink = document.createElement('a');
    const fileName = 'document.pdf';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  if (loading) {
    return (
      <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="history-table-container">
      <h2>Domain Service History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Created At</th>
            <th>
              Type
              <FontAwesomeIcon
                icon={faFilter}
                className="filter-icon"
                onClick={sortData}
              />
            </th>
            <th>State</th>
            <th>Document</th>
          </tr>
        </thead>
        <tbody>
          {historyData.length === 0 ? (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          ) : (
            historyData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.createdAt}</td>
                <td>
                  {renderTypeIcon(item.type)} {item.type}
                </td>
                <td>
                  {renderStateIcon(item.state)} {item.state}
                </td>
                <td>
                  {item.document ? (
                    <button
                      onClick={() => handleViewDocument(item.document)}
                      className="view-document-button"
                    >
                      <FontAwesomeIcon icon={faFilePdf} /> View
                    </button>
                  ) : (
                    "No Document"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryDomonde;
