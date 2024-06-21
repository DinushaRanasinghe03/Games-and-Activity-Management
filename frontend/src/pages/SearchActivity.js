import Layout from "../components/Layout/Layout";
import React from "react";
import { useSearch } from "../context/Search.js";
import { useNavigate } from "react-router-dom";

const SearchActivity = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {values?.results.length < 1
              ? "No Game or Activity Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((g) => (
              <div className="card m-4" style={{ width: "18rem" }}>
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
                  <p className="card-text">{g.guidelines}</p>
                  <button
                    class="btn btn-primary ms-2"
                    onClick={() => navigate(`/activity/${g.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    class="btn btn-secondary ms-2"
                    onClick={() =>
                      navigate(`/gamesandactivitiesrequests/${g.slug}`, {
                        state: { name: g.name },
                      })
                    }
                  >
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchActivity;
