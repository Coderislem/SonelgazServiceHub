
import SideBare from "../components/SideBare";
import {AdminLinks} from '../components/SideBareLinks'
function AdminSideBare() {
  
 return(
  <>
  
  <SideBare arrayLinksFromsidebare={AdminLinks} />
  </>
 )
}

export default AdminSideBare;

// const [arrayLinks,setarrayLinks]=useState([]);
// useEffect(() => {
  
//   setarrayLinks(arrayLinksFromsidebare);
// }, []);
// return (
//   <aside className="relative bg-blue-500 h-screen w-64 hidden sm:block shadow-xl">
//     <div className="p-6">
//       <a href="index.html" className="text-center">
//         <img
//           style={{ width: "100px", height: "97px", marginLeft: "14px" }}
//           src={Logo}
//           alt="Logo"
//         />
//       </a>
//     </div>
//     <nav className="text-white text-base font-semibold pt-3">
//      {
//       arrayLinks.map((item)=>{
//         <Link key={item.id}
//         to={item.hef}
//         className="flex items-center active-nav-link text-white py-4 pl-6 nav-item text-center"
//       >
//         {item.icon}
//         <span className="font-semibold center w-6/6 mx-4"> {item.labl} </span>
//       </Link>


//       })
//      }

//     </nav>
//   </aside>
// );









  {/* <Link
          to="/admindashboard/chefajouns"
          className="flex items-center active-nav-link text-white py-4 pl-6 nav-item text-center"
        >
          <UserGroupIcon className="h-6 w-6" />
          <span className="font-semibold center w-6/6 mx-4">Users</span>
        </Link>
        <Link
          to="/admindashboard/lesdomonde"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
        >
          <DocumentDuplicateIcon className="h-6 w-6" />
          <span className="font-semibold center w-6/6 mx-4">Les domande</span>
        </Link>
        <Link
          to="/admindashboard/state"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
        >
          <ChartBarIcon className="h-6 w-6" />
          <span className="font-semibold center w-6/6 mx-4">State</span>
        </Link> */}
