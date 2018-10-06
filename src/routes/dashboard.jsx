import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";
import Typography from "views/Typography/Typography";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Icons
  },
  /*
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile
  },
  */
  

 {
  path: "/leaderboard",
  name: "Leaderboard",
  icon: "pe-7s-diamond"
},

  { path: "/blocks", name: "Explore Blocks", icon: "pe-7s-science", component: Dashboard },
  
  

  {
    path: "/history",
    name: "History",
    icon: "pe-7s-note2",
    component: TableList
  },

  
  
  //{ path: "/maps", name: "Map [WIP]", icon: "pe-7s-map-marker", component: Maps },
  /*
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications
  },
  */
  /*
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade
  },
  */
 {
  path: "/aboutus",
  name: "About us",
  icon: "pe-7s-news-paper",
  component: Typography
},

  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
