import React,{useEffect,useState} from 'react'
import Header from './Header/Header'
import PageContent from './PageContent'
import LeftSidebar from './LeftSidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function AllDashboard() {
  const navigate=useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
           
            if (!token) {
              // Redirect to login page if token is not found
              navigate('/login');
              return;
            }
            console.log(token)
            const response = await axios.get('http://127.0.0.1:8000/api/getuser', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setLoading(false);
            setUserData(response.data);
           console.log(response.data)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
}, [navigate]);

if (loading) {
  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
}

return (
    <div >
    <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
    {userData && <PageContent userData={userData} />}

</div>

  )
};

export default AllDashboard;
