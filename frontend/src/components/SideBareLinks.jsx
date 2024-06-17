// import {
//     UserGroupIcon,
//     DocumentDuplicateIcon,
//     ChatBubbleIcon,
//   } from "@heroicons/react/24/outline";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { UserGroupIcon,DocumentDuplicateIcon,ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
  import { faUserCog,faRecycle,faExclamationTriangle ,faClipboardList ,faUserTie  } from "@fortawesome/free-solid-svg-icons";
  export const AdminLinks = [
    
    {
      id: '3',
      icon: <ChartBarIcon className="h-6 w-6" />,
      label: "State",
      href: "/admindashboard/state",
    },
   
    {
      id: '6',
      icon: <FontAwesomeIcon icon={faExclamationTriangle} className="h-6 w-6" />,
      label: "Proplem Types",
      href: "/admindashboard/raporetype",
    },
    {
      id: '7',
      icon: <FontAwesomeIcon icon={faClipboardList} className="h-6 w-6" />,
      label: "sub mangment",
      href: "/admindashboard/NewAjouns",
    },
    {
      id: '8',
      icon: <FontAwesomeIcon icon={faUserTie } className="h-6 w-6" />,
      label: "Section Manager",
      href: "/admindashboard/chefajouns",
    },
    
  ];
  
  export const chefajounceLinks = [
  
    {
      id: '1',
      icon: <DocumentDuplicateIcon className="h-6 w-6" />,
      label: "Service Requests",
      href: "/chefajounsdashboard/lesdomonde",
    },
    {
      id: '2',
      icon: <FontAwesomeIcon icon={faRecycle} className="h-6 w-6" />,
      label: "Problem Report",
      href: "/chefajounsdashboard/tableReclamation",
    },
  
  ];
  
  export const ClientLinks = [
    {
      id: '1',
      icon: <UserGroupIcon className="h-6 w-6" />,
      label: "Les Domonde",
      href: "/dashboard/domande",
    },
    {
      id: '2',
      icon: <UserGroupIcon className="h-6 w-6" />,
      label: "Send Problem",
      href: "/dashboard/reclamation",
    },
    {
      id: '3',
      icon: <UserGroupIcon className="h-6 w-6" />,
      label: "About",
      href: "/dashboard/about",
    },
  ];