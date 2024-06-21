import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Radio, Spin } from "antd";
import SearchInputActivity from "../../components/Form/SearchInputActivity";

const GamesAndActivities = () => {
  const navigate = useNavigate();
  const [gamesandactivities, setGamesAndActivities] = useState([]); // State to store games and activities
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState(null); // State to store selected category
  const [loading, setLoading] = useState(false); // State to manage loading spinner

  // Get all games categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/activitycategory/get-activitycategory"
      );
      if (data?.success) {
        setCategories(data?.category); // Set categories state with data from API
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get games and activities
  const getAllGamesAndActivities = async () => {
    setLoading(true); // Start loading spinner
    try {
      const { data } = await axios.get(
        "/api/v1/gameandactivity/get-gameandactivity"
      );
      setGamesAndActivities(data.gamesandactivities); // Set games and activities state with data from API
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  useEffect(() => {
    getAllCategory(); // Fetch all categories when component mounts
    getAllGamesAndActivities(); // Fetch all games and activities when component mounts
  }, []);

  // Filter by category
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId); // Update selected category state
    setLoading(true); // Start loading spinner
    if (!categoryId) {
      getAllGamesAndActivities(); // If category is null, fetch all games and activities
    } else {
      try {
        const { data } = await axios.post(
          `/api/v1/gameandactivity/gameandactivity-filters`,
          { checked: [categoryId] }
        );
        setGamesAndActivities(data?.gamesandactivities); // Set games and activities state with filtered data
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
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
    <Layout title="All Games and Activities">
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Categories sidebar */}
          <div className="col-md-2">
            <h5 className="text-left">
              Explore Games and Activities by Category
            </h5>
            <div className="d-flex flex-column">
              <Radio.Group
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <Radio.Button value={null}>All</Radio.Button>
                {/* Mapping through categories to display radio buttons */}
                {categories?.map((c) => (
                  <Radio.Button key={c._id} value={c._id}>
                    {c.name}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>
          </div>
          {/* Games and activities display */}
          <div className="col-md-10">
            <div className="row mt-3">
              <SearchInputActivity />
              <h1 className="text-center">Games and Activities</h1>
              <h6 className="text-center">
                Elevate your leisure with our streamlined online scheduling for
                games and activities.
              </h6>
              <div className="d-flex flex-wrap">
                {/* Display loading spinner when loading */}
                {loading ? (
                  <div className="w-100 text-center">
                    <Spin size="large" />
                  </div>
                ) : (
                  // Map through games and activities to display cards
                  gamesandactivities?.map((g) => (
                    <div
                      className="card m-4"
                      style={{ width: "18rem" }}
                      key={g._id}
                    >
                      <img
                        src={`/api/v1/gameandactivity/gameandactivity-activityimage/${g._id}`}
                        className="card-img-top"
                        alt={g.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{g.name}</h5>
                        <p className="card-text">
                          {g.description.substring(0, 30)}...
                        </p>
                        <p className="card-text">
                          {g.guidelines.substring(0, 30)}...
                        </p>
                        {/* Button to view more details */}
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => navigateToGameDetails(g.slug)}
                        >
                          More Details
                        </button>
                        {/* Button to request */}
                        <button
                          className="btn btn-secondary ms-2"
                          onClick={() => navigateToRequests(g.slug, g.name)}
                        >
                          Request
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GamesAndActivities;
