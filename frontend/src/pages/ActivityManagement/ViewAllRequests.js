import React, { useState, useEffect } from "react";
import AdminActivityMenu from "../../components/Layout/AdminActivityMenu";
//import toast from "react-hot-toast";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Layout from "../../components/Layout/Layout";

export const ViewAllRequests = () => {
  const [gamesAndActivitiesRequest, setGamesAndActivitiesRequest] = useState(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllGamesAndActivitiesRequest();
  }, []);

  const getAllGamesAndActivitiesRequest = async () => {
    try {
      const response = await axios.get(
        "/api/v1/gameandactivityRequest/get-gameandactivityRequest"
      );
      setGamesAndActivitiesRequest(response.data.gameandactivityRequest);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Something went wrong while fetching requests");
    }
  };

  const downloadDailyReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "/api/v1/gameandactivityRequest/daily-report",
        {
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Pending Request_report.pdf";
      a.click();
    } catch (error) {
      console.error("Error downloading daily report:", error);
      toast.error("Failed to download daily report");
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id) => {
    // Ask for confirmation before deleting
    const confirmed = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirmed) return; // If not confirmed, do nothing

    try {
      await axios.delete(
        `/api/v1/gameandactivityRequest/delete-gameandactivityRequest/${id}`
      );
      // Update the list of requests after deletion
      getAllGamesAndActivitiesRequest();
      toast.success("Request deleted successfully");
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete request");
    }
  };
  // Function to format date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust this according to your required format
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString(); // Adjust this according to your required format
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminActivityMenu />
          </div>
          <div className="col-md-9">
            <div className="row mt-3">
              <h4 className="text-center">
                <legend>All User Requests</legend>
              </h4>
              <div className="d-flex flex-wrap">
                {gamesAndActivitiesRequest.map((request) => (
                  <div
                    className="card m-4"
                    style={{ width: "18rem" }}
                    key={request._id}
                  >
                    <div className="card-body">
                      <p className="card-text">
                        Game or Activity Name: {request.name}
                      </p>
                      <p className="card-text">
                        Member Name: {request.MemberName}
                      </p>
                      <p className="card-text">
                        Number of Participation: {request.noParticipation}
                      </p>
                      <p className="card-text">
                        Registered Email: {request.regiEmail}
                      </p>
                      <p className="card-text">
                        Preferred Date: {formatDate(request.scheduledDate)}
                      </p>
                      <p className="card-text">
                        Preferred Time: {formatTime(request.Time)}
                      </p>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteRequest(request._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="row mt-3">
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={downloadDailyReport}
                  disabled={loading}
                >
                  {loading
                    ? "Downloading..."
                    : "Download Pending Request Report"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
};

export default ViewAllRequests;
