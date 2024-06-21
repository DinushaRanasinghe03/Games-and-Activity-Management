import React from "react";
import { NavLink } from "react-router-dom";

const AdminActivityMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Games And Activities Management Panel
          </h1>
          <NavLink
            to="/adminactivitydashboard/activitymanagement/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Activity Category
          </NavLink>
          <NavLink
            to="/adminactivitydashboard/activitymanagement/add-activities"
            className="list-group-item list-group-item-action"
          >
            Add Games And Activities
          </NavLink>
          <NavLink
            to="/adminactivitydashboard/activitymanagement/activities"
            className="list-group-item list-group-item-action"
          >
            All Games and Activities
          </NavLink>
          <NavLink
            to="/adminactivitydashboard/activitymanagement/requests"
            className="list-group-item list-group-item-action"
          >
            View All Requests
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminActivityMenu;
