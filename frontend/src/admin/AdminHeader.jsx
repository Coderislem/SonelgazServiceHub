import React, { useState, useEffect } from "react";
import DefaultAvatar from "../assets/avatar.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline";
import Logosonelgaz from "../assets/sonelgaz_white.png";
import {
  DocumentPlusIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

function AdminHeader({ withicon, logoIcon, Modifyacount }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(DefaultAvatar);
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/getuser', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const user = response.data;
            console.log('User data:', user); // Log user data for debugging
            if (user.imageProfile) {
                const imageUrl = `http://127.0.0.1:8000/storage/${user.imageProfile}`;
                console.log('Image URL:', imageUrl); // Log image URL for debugging
                setAvatarUrl(imageUrl);
            } else {
                console.warn('No imageProfile found for user.');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
}, []);

  const handleToggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmenu = () => {
    setOpenSubmenu(!openSubmenu);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/api/Logout', null, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="w-full bg-primary py-2 px-6 shadow-xl">
      <div
        className="flex items-center"
        style={{
          width: "70%",
          margin: "0 auto",
          justifyContent: `${!withicon ? "flex-end" : "space-between"}`,
        }}
      >
        {logoIcon && (
          <img
            src={Logosonelgaz}
            alt="Logo"
            width="60px"
            height="30px"
            style={{ cursor: "pointer" }}
          />
        )}
        {withicon && (
          <ul className="flex space-x-6 ml-16">
            <li>
              <Link
                to="/dashboard/domande"
                className="text-white flex items-center space-x-2 hover:text-gray-300"
              >
                <DocumentPlusIcon className="w-5 h-5 mx-1" />
                Service Request
              </Link>
            </li>
            <li className="border-l border-white pl-2">
              <Link
                to="/dashboard/newreclamation"
                className="text-white flex items-center space-x-2 hover:text-gray-300"
              >
                <ChatBubbleBottomCenterTextIcon className="w-5 h-5 mx-1" />
                Problem Report
              </Link>
            </li>
            <li className="border-l border-white pl-2">
              <button
                onClick={handleSubmenu}
                className="flex items-center text-white cursor-pointer hover:text-gray-300"
              >
                <ClockIcon className="w-5 h-5 mx-1" />
                History
                <ChevronDoubleDownIcon className="w-3 h-3 mx-3" />
              </button>
              {openSubmenu && (
                <div
                  className="absolute bg-white p-2 rounded-lg top-8 left-40 border border-gray-200"
                  style={{ top: "67px", left: "760px" }}
                >
                  <Link
                    to="/dashboard/historydomonde"
                    className="block text-gray-700 py-2 px-4 hover:bg-gray-100"
                  >
                    requists
                  </Link>
                  <Link
                    to="/dashboard/historyreclamation"
                    className="block text-gray-700 py-2 px-4 hover:bg-gray-100"
                  >
                    reporte
                  </Link>
                </div>
              )}
            </li>
          </ul>
        )}
        <div className="relative flex items-center justify-end">
          {withicon && <BellIcon className="w-5 h-5 mx-5" />}
          <button
            onClick={handleToggleSubMenu}
            className="w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
          >
            <img src={avatarUrl} alt="User Avatar" />
          </button>
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 cursor-default"
            ></button>
          )}
          {isOpen && (
            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-40">
              <Link
                to={Modifyacount}
                className="block px-4 py-2 account-link hover:bg-primary hover:text-white"
              >
                Account
              </Link>
              <button
                className="block px-4 py-2 account-link hover:bg-primary hover:text-white"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
