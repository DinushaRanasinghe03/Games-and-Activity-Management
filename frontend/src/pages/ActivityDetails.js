import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const ActivityDetails = () => {
  const navigate = useNavigate();
  // Get the slug parameter from the URL
  const params = useParams();

  // State variables to store game/activity details and related games/activities
  const [gameandactivity, setGameandactivity] = useState({});
  const [relatedGameAndActivity, setRelatedGameAndActivity] = useState([]);

  // Fetch game/activity details when the component mounts or slug parameter changes
  useEffect(() => {
    if (params?.slug) {
      getGameAndActivity();
    }
  }, [params?.slug]);

  // Function to fetch game/activity details based on slug
  const getGameAndActivity = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/gameandactivity/get-gameandactivity/${params.slug}`
      );
      // Set game/activity details
      setGameandactivity(data?.gamesandactivities);
      // If game/activity ID is available, fetch related games/activities
      if (data?.gamesandactivities?._id) {
        getSimilarGameAndActivity(
          data?.gamesandactivities._id,
          data?.gamesandactivities.gameoractivitycategory._id
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch related games/activities based on current game/activity ID
  const getSimilarGameAndActivity = async (aid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/gameandactivity/related-gameandactivity/${aid}/${cid}`
      );
      // Set related games/activities
      setRelatedGameAndActivity(data?.gamesandactivities);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to navigate to game details page
  const navigateToGameDetails = (slug) => {
    navigate(`/activity/${slug}`);
  };
  // Function to navigate to requests page
  const navigateToRequests = (slug, name) => {
    navigate(`/gamesandactivitiesrequests/${slug}`, { state: { name } });
  };
  return (
    <Layout title={"Games and Activities Details"}>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-6">
            {/* Display image of the game/activity */}
            <img
              src={`/api/v1/gameandactivity/gameandactivity-activityimage/${gameandactivity._id}`}
              className="card-img-top"
              alt={gameandactivity.name}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="col-md-6">
            {/* Display details of the game/activity */}
            <h1 className="text-center">Games and Activity Details</h1>
            <h6>Name: {gameandactivity.name}</h6>
            <br />
            <h6>Description: {gameandactivity.description}</h6>
            <br />
            <h6>Guidelines: {gameandactivity.guidelines}</h6>
            <br />
            <h6>Category: {gameandactivity?.gameoractivitycategory?.name}</h6>
            <br />
            <h6>Instructors: {gameandactivity?.instructors}</h6>
            {/* Button for requesting the game/activity */}
            <button
              className="btn btn-secondary ms-2"
              onClick={() =>
                navigateToRequests(gameandactivity.slug, gameandactivity.name)
              }
            >
              Request
            </button>
          </div>
        </div>

        <hr />
        <div className="row mt-4">
          <h4 className="text-center">Similar Games and Activities</h4>
          {/* Display related games/activities */}
          {relatedGameAndActivity.length > 0 ? (
            relatedGameAndActivity.map((g) => (
              <div key={g._id} className="col-md-3 mb-4">
                <div className="card">
                  <img
                    src={`/api/v1/gameandactivity/gameandactivity-activityimage/${g._id}`}
                    className="card-img-top"
                    alt={g.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{g.name}</h5>
                    <p className="card-text">{g.description}</p>
                    {/* Button for viewing details of related game/activity */}
                    <button
                      className="btn btn-primary ms-2"
                      onClick={() => navigateToGameDetails(g.slug)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No similar games and activities found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ActivityDetails;
