import React, { useState } from "react";
import { CameraIcon, MicrophoneIcon } from "@heroicons/react/24/outline";
import FormReclamation from "./FormReclamation";
import { Link } from "react-router-dom";

const SendReclamation = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = (show) => {
    setShowForm(show);
    if (show) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
      document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Dim the background
    } else {
      document.body.style.overflow = ''; // Enable scrolling
      document.body.style.backgroundColor = ''; // Reset the background color
    }
  };

  const handleNewButtonClick = () => {
    setShowForm(true); // Set showForm state to true when "New" button is clicked
  };
  return (
    <div
      style={{
        padding: "14px",
        backgroundColor: "white",
        width: "100%",
        border: "1px solid transparent",
        borderRadius: "4px",
      }}
    >
      <Link to="/dashboard/newreclamation">
      
      
      <button
        className="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
      
        style={{ float: "right" }}
       
       
      >
        New
      </button>
      </Link>
      {showForm && <FormReclamation setShowForm={setShowForm} />}

      <div className="overflow-x-auto" style={{ marginTop: "50px" }}>
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                State
              </th>

              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                958
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                24/05/2023
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                in progress
              </td>

              <td className="whitespace-nowrap px-4 py-2">
                <a
                  href="#"
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>

            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                581
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                04/11/2023
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                reject
              </td>

              <td className="whitespace-nowrap px-4 py-2">
                <a
                  href="#"
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>

            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Gary Barlow
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                24/05/1995
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Singer
              </td>

              <td className="whitespace-nowrap px-4 py-2">
                <a
                  href="#"
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SendReclamation;
