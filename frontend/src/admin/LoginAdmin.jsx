import React, { useState } from 'react';
import Mylogo from '../assets/Sonlgazlogo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
 const navigate =  useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/loginChafeAgenc', { email, password });
      console.log(response.data);
      const chafAjence = response.data.chafAjence;
     
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('chafAjence', JSON.stringify(chafAjence));
      if(chafAjence.role=="1"){
          navigate("/admindashboard");
      }else if(chafAjence.role=="0") {
        navigate("/chefajounsdashboard");
      } 
      else console.log("note found")
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-6 bg-gray-200">
      <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-center">
          <div>
            <img src={Mylogo} alt="Logo" width="60px" height="30px" style={{ cursor: 'pointer' }} />
          </div>
          <span className="text-2xl font-semibold text-gray-700 pl-5">Sonelgaze</span>
        </div>

        <form className="mt-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm text-gray-700">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="block w-full mt-1 border border-gray-200 rounded-md py-2 px-3 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            />
          </label>

          <label className="block mt-3">
            <span className="text-sm text-gray-700">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="block w-full mt-1 border border-gray-200 rounded-md py-2 px-3 focus:border-primary-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            />
          </label>

          <div className="flex items-center justify-between mt-4">
           
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
