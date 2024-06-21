import React, { useState, useEffect } from "react";
import AdminActivityMenu from "../../components/Layout/AdminActivityMenu";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
const { Option } = Select;

export const AddGamesAndActivities = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [activityimage, setActivityImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gameoractivitycategory, setGameoractivitycategory] = useState("");
  const [guidelines, setGuidelines] = useState("");
  const [instructors, setInstructor] = useState("");
  const [imageValidationError, setImageValidationError] = useState("");
  const [errors, setErrors] = useState({});

  //get all games categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/activitycategory/get-activitycategory"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong in getting Games and Activities Category"
      );
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // Validation function to check if the file is an image
  const validateImageFile = (file) => {
    return file.type.startsWith("image");
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setActivityImage(file);
    if (file && !validateImageFile(file)) {
      setImageValidationError("Please upload only image files.");
    } else {
      setImageValidationError("");
    }
  };

  //add games and activities function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const errors = {};
      if (!name.trim()) errors.name = "Name is required";
      else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
        errors.name = "Name must contain only letters";
      }
      if (!description.trim()) errors.description = "Description is required";
      if (!guidelines.trim()) errors.guidelines = "Guidelines are required";
      if (!instructors) errors.instructors = "Instructors are required";
      if (!activityimage) errors.activityimage = "Image is required";
      if (!gameoractivitycategory)
        errors.gameoractivitycategory = "Category is required";

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      // Check if the selected file is an image
      if (activityimage && !validateImageFile(activityimage)) {
        setImageValidationError("Please upload only image files.");
        return; // Prevent form submission
      }

      const gameandactivityData = new FormData();
      gameandactivityData.append("name", name);
      gameandactivityData.append("description", description);
      gameandactivityData.append("guidelines", guidelines);
      gameandactivityData.append("instructors", instructors);
      gameandactivityData.append("activityimage", activityimage);
      gameandactivityData.append(
        "gameoractivitycategory",
        gameoractivitycategory
      );
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/gameandactivity/create-gameandactivity",
        gameandactivityData
      );
      if (data?.success) {
        setTimeout(() => {
          toast.success("Game or Activity Added Successfully");
        }, 1000);
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
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminActivityMenu />
          </div>
          <div className="col-md-9">
            <h4 className="text-center">
              <legend>Add Games And Activities</legend>
            </h4>
            <div className="m-1 w-75">
              <div className="mb-3">
                <label>Category:</label>
                <Select
                  bordered={false}
                  placeholder="Select game or activity category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setGameoractivitycategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                {errors.gameoractivitycategory && (
                  <div className="text-danger">
                    {errors.gameoractivitycategory}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="activityimage"
                  className="btn btn-outline-secondary col-md-12"
                >
                  {activityimage
                    ? activityimage.name
                    : " Upload game or activity image"}
                  <input
                    id="activityimage"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
                {errors.activityimage && (
                  <div className="text-danger">{errors.activityimage}</div>
                )}
                {imageValidationError && (
                  <div className="text-danger">{imageValidationError}</div>
                )}
              </div>
              <div className="mb-3">
                {activityimage && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(activityimage)}
                      alt="gameandactivity_activityimage"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  placeholder="write game or activity name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <label>Description:</label>
                <input
                  type="text"
                  value={description}
                  placeholder="write a description about the game or activity"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (
                  <div className="text-danger">{errors.description}</div>
                )}
              </div>
              <div className="mb-3">
                <label>Guidelines:</label>
                <input
                  type="text"
                  value={guidelines}
                  placeholder="write guidelines for the game or activity"
                  className="form-control"
                  onChange={(e) => setGuidelines(e.target.value)}
                />
                {errors.guidelines && (
                  <div className="text-danger">{errors.guidelines}</div>
                )}
              </div>
              <div className="mb-3">
                <label>Availability of Instructor:</label>
                <Select
                  bordered={false}
                  placeholder="Availability of Instructor"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setInstructor(value);
                  }}
                >
                  <Option value="1">Instructor Available</Option>
                  <Option value="0">Instructor Not Available</Option>
                </Select>
                {errors.instructors && (
                  <div className="text-danger">{errors.instructors}</div>
                )}
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  ADD GAME OR ACTIVITY
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

export default AddGamesAndActivities;
