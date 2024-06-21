import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/user/Dashboard";
import { AdminActivityDashboard } from "./pages/ActivityManagement/AdminActivityDashboard";
import { CreateActivityCategory } from "./pages/ActivityManagement/CreateActivityCategory";
import { AddGamesAndActivities } from "./pages/ActivityManagement/AddGamesAndActivities";
import { AllGamesAndActivities } from "./pages/ActivityManagement/AllGamesAndActivities";
import { ViewAllRequests } from "./pages/ActivityManagement/ViewAllRequests";
import { UpdateGamesAndActivities } from "./pages/ActivityManagement/UpdateGamesAndActivities";
import GamesAndActivities from "./pages/user/GamesAndActivities";
import GamesAndActivitiesRequests from "./pages/user/GamesAndActivitiesRequests";
import ActivityDetails from "./pages/ActivityDetails";
import SearchActivity from "./pages/SearchActivity";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activity/:slug" element={<ActivityDetails />} />
        <Route path="/gamesandactivities/search" element={<SearchActivity />} />
        <Route path="/gamesandactivities" element={<GamesAndActivities />} />
        <Route
          path="/gamesandactivitiesrequests/:slug"
          element={<GamesAndActivitiesRequests />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route
          path="/adminactivitydashboard/activitymanagement"
          element={<AdminActivityDashboard />}
        />
        <Route
          path="/adminactivitydashboard/activitymanagement/create-category"
          element={<CreateActivityCategory />}
        />
        <Route
          path="/adminactivitydashboard/activitymanagement/add-activities"
          element={<AddGamesAndActivities />}
        />
        <Route
          path="/adminactivitydashboard/activitymanagement/activities"
          element={<AllGamesAndActivities />}
        />
        <Route
          path="/adminactivitydashboard/activitymanagement/allgamesandactivities/:slug"
          element={<UpdateGamesAndActivities />}
        />
        <Route
          path="/adminactivitydashboard/activitymanagement/requests"
          element={<ViewAllRequests />}
        />
      </Routes>
    </>
  );
}

export default App;
