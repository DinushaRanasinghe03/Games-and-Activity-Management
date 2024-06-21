import React, { useState, useEffect } from "react";
import AdminActivityMenu from "../../components/Layout/AdminActivityMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
//import SearchInputActivity from "../../components/Form/SearchInputActivity";
import Layout from "../../components/Layout/Layout";

export const AllGamesAndActivities = () => {
  const [gamesandactivities, setGameandactivity] = useState([]);

  //getall activities
  const getAllGamesAndActivities = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/gameandactivity/get-gameandactivity"
      );
      setGameandactivity(data.gamesandactivities);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //Lifecycle method
  useEffect(() => {
    getAllGamesAndActivities();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminActivityMenu />
          </div>
          <div className="col-md-9 ">
            <div className="row mt-3">
              <h4 className="text-center">
                <legend>All Games And Activities</legend>
              </h4>
              <div className="d-flex flex-wrap">
                {gamesandactivities?.map((g) => (
                  <Link
                    key={g._id}
                    to={`/adminactivitydashboard/activitymanagement/allgamesandactivities/${g.slug}`}
                    className="gamesandactivities-link"
                  >
                    <div className="card m-4" style={{ width: "18rem" }}>
                      <img
                        src={`/api/v1/gameandactivity/gameandactivity-activityimage/${g._id}`}
                        className="card-img-top"
                        alt={g.name}
                        style={{ height: "200px", objectFit: "cover" }} // Set fixed height for image and cover
                      />
                      <div className="card-body" style={{ height: "300px" }}>
                        {" "}
                        {/* Set fixed height for card body */}
                        <h5
                          className="card-title"
                          style={{ height: "50px", overflow: "hidden" }}
                        >
                          {g.name}
                        </h5>{" "}
                        {/* Set fixed height and hide overflow for title */}
                        <p
                          className="card-text"
                          style={{ height: "70px", overflow: "hidden" }}
                        >
                          {g.description}
                        </p>{" "}
                        {/* Set fixed height and hide overflow for description */}
                        <p
                          className="card-text"
                          style={{ height: "70px", overflow: "hidden" }}
                        >
                          {g.guidelines}
                        </p>{" "}
                        {/* Set fixed height and hide overflow for guidelines */}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllGamesAndActivities;
