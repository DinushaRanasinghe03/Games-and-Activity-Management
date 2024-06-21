import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";

const Gamesandactivitiesrequests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [MemberName, setMemberName] = useState("");
  const [noParticipation, setNoParticipation] = useState("");
  const [regiEmail, setRegiEmail] = useState("");
  const [scheduledDate, setScheduledDate] = useState(null); // Initialize with null
  const [Time, setTime] = useState(null); // Initialize with null
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.name) {
      setName(location.state.name); // set the name from the location state
    }
  }, [location.state]);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          return "Please enter a name for the game or activity";
        }
        break;
      case "MemberName":
        if (!value.trim()) {
          return "Please enter the contact person's name";
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          return "Member name must contain only letters";
        }
        break;
      case "noParticipation":
        if (!value.trim()) {
          return "Please enter the number of participants";
        } else if (!/^\d+$/.test(value.trim())) {
          return "Number of participants must be a valid number";
        }
        break;
      case "regiEmail":
        if (!value.trim()) {
          return "Please enter your registered email address";
        } else if (!/^\S+@\S+\.\S+$/.test(value.trim())) {
          return "Please enter a valid email address";
        }
        break;
      case "scheduledDate":
        if (!value) {
          return "Please select a preferred date";
        }
        break;
      case "Time":
        if (!value) {
          return "Please select a preferred time";
        }
        break;
      default:
        return null;
    }
    return null;
  };

  const handleInputChange = (fieldName, value) => {
    const newErrors = { ...errors };
    const errorMessage = validateField(fieldName, value);
    if (errorMessage) {
      newErrors[fieldName] = errorMessage;
    } else {
      delete newErrors[fieldName];
    }
    setErrors(newErrors);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const formFields = {
      name,
      MemberName,
      noParticipation,
      regiEmail,
      scheduledDate,
      Time,
    };

    let isValid = true;
    Object.keys(formFields).forEach((fieldName) => {
      const errorMessage = validateField(fieldName, formFields[fieldName]);
      if (errorMessage) {
        isValid = false;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: errorMessage,
        }));
      }
    });

    if (!isValid) return;

    try {
      const gameandactivityRequestData = new FormData();
      gameandactivityRequestData.append("name", name);
      gameandactivityRequestData.append("MemberName", MemberName);
      gameandactivityRequestData.append("noParticipation", noParticipation);
      gameandactivityRequestData.append("regiEmail", regiEmail);
      gameandactivityRequestData.append("scheduledDate", scheduledDate);
      gameandactivityRequestData.append("Time", Time);
      const { data } = await axios.post(
        "/api/v1/gameandactivityRequest/create-gameandactivityRequest",
        gameandactivityRequestData
      );
      if (data?.success) {
        setTimeout(() => {
          toast.success("Successfully added a Request");
        }, 1000);
        navigate("/gamesandactivities");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card p-4">
              <h1 className="mb-4">Request Game or Activity</h1>
              <form onSubmit={handleCreate}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Game or Activity name"
                    className="form-control"
                    onChange={(e) => {
                      setName(e.target.value);
                      handleInputChange("name", e.target.value);
                    }}
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={MemberName}
                    placeholder="Contact person name"
                    className="form-control"
                    onChange={(e) => {
                      setMemberName(e.target.value);
                      handleInputChange("MemberName", e.target.value);
                    }}
                  />
                  {errors.MemberName && (
                    <div className="text-danger">{errors.MemberName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={noParticipation}
                    placeholder="Number of participants"
                    className="form-control"
                    onChange={(e) => {
                      setNoParticipation(e.target.value);
                      handleInputChange("noParticipation", e.target.value);
                    }}
                  />
                  {errors.noParticipation && (
                    <div className="text-danger">{errors.noParticipation}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={regiEmail}
                    placeholder="Enter registered email"
                    className="form-control"
                    onChange={(e) => {
                      setRegiEmail(e.target.value);
                      handleInputChange("regiEmail", e.target.value);
                    }}
                  />
                  {errors.regiEmail && (
                    <div className="text-danger">{errors.regiEmail}</div>
                  )}
                </div>
                <div className="mb-3">
                  <DatePicker
                    selected={scheduledDate}
                    placeholderText="Select preferred date"
                    onChange={(date) => {
                      setScheduledDate(date);
                      handleInputChange("scheduledDate", date);
                    }}
                    className="form-control"
                    dateFormat="MM/dd/yyyy"
                    minDate={new Date()} // Restrict to today and future dates
                  />
                  {errors.scheduledDate && (
                    <div className="text-danger">{errors.scheduledDate}</div>
                  )}
                </div>
                <div className="mb-3">
                  <DatePicker
                    selected={Time}
                    placeholderText="Select preferred time"
                    onChange={(time) => {
                      setTime(time);
                      handleInputChange("Time", time);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="h:mm aa"
                    className="form-control"
                    timeIntervals={60}
                    timeCaption="Time"
                    minTime={new Date().setHours(8, 0)} // 8:00 AM
                    maxTime={new Date().setHours(22, 0)} // 10:00 PM
                  />
                  {errors.Time && (
                    <div className="text-danger">{errors.Time}</div>
                  )}
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    SUBMIT REQUEST
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gamesandactivitiesrequests;
