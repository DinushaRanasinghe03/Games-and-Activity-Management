import React, { useState, useEffect } from "react";
import AdminActivityMenu from "../../components/Layout/AdminActivityMenu";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const { Option } = Select;

export const UpdateGamesAndActivities = () => {
  const [categories, setCategories] = useState([]);
  const [activityimage, setaImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gameoractivitycategory, setGameoractivitycategory] = useState("");
  const [guidelines, setGuidelines] = useState("");
  const [instructors, setInstructor] = useState("");
  const [nameError, setNameError] = useState("");
  const [imageError, setImageError] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState("");

  //get single activity
  const getSingleActivity = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/gameandactivity/get-gameandactivity/${params.slug}`
      );
      setName(data.gamesandactivities.name);
      setId(data.gamesandactivities._id);
      setGameoractivitycategory(
        data.gamesandactivities.gameoractivitycategory._id
      );
      setaImage(data.gamesandactivities.activityimage);
      setDescription(data.gamesandactivities.description);
      setGuidelines(data.gamesandactivities.guidelines);
      setInstructor(data.gamesandactivities.instructors);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleActivity();
    //eslint-disable-next-line
  }, []);

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

  const validateImage = (file) => {
    if (!file) {
      setImageError("Please upload an image");
      return false;
    }
    const acceptedImageTypes = ["image/jpeg", "image/png"];
    if (!acceptedImageTypes.includes(file.type)) {
      setImageError("Please upload a valid image file (JPEG, PNG)");
      return false;
    }
    setImageError("");
    return true;
  };

  const validateName = (name) => {
    if (!name) {
      setNameError("Please enter a name");
      return false;
    }
    if (!/^[a-zA-Z ]+$/.test(name)) {
      setNameError("Name should contain only letters");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const isNameValid = validateName(name);
    const isImageValid = activityimage ? validateImage(activityimage) : true; // Validate image only if it's being updated or if name is being updated
    if (
      !gameoractivitycategory ||
      !isNameValid ||
      !isImageValid ||
      !description ||
      !guidelines ||
      !instructors
    ) {
      toast.error("Please fill in all fields correctly");
      return;
    }
    try {
      const gameandactivityData = new FormData();
      gameandactivityData.append(
        "gameoractivitycategory",
        gameoractivitycategory
      );
      gameandactivityData.append("name", name);
      gameandactivityData.append("description", description);
      gameandactivityData.append("guidelines", guidelines);
      gameandactivityData.append("instructors", instructors);
      activityimage &&
        gameandactivityData.append("activityimage", activityimage);

      const { data } = await axios.put(
        `/api/v1/gameandactivity/update-gameandactivity/${id}`,
        gameandactivityData
      );
      if (data?.success) {
        setTimeout(() => {
          toast.success("Game or Activity Updated Successfully");
        }, 1000);
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      //prompt message  to delete game or activity
      let answer = window.prompt(
        "Are you sure, want to delete this game or activity?"
      );
      if (answer !== "yes") return;
      const { data } = await axios.delete(
        `/api/v1/gameandactivity/delete-gameandactivity/${id}`
      );
      navigate("/adminactivitydashboard/activitymanagement/activities");
      setTimeout(() => {
        toast.success("Game or Activity Deleted successefully");
      }, 1000);
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
            <h1>Update Games And Activities</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select game or activity category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setGameoractivitycategory(value);
                }}
                value={gameoractivitycategory}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {activityimage
                    ? activityimage.name
                    : " Upload game or activity image"}

                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setaImage(e.target.files[0]);
                      validateImage(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
                {imageError && <p className="text-danger">{imageError}</p>}
              </div>
              <div className="mb-3">
                {activityimage ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(activityimage)}
                      alt="gameandactivity_activityimage"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/gameandactivity/gameandactivity-activityimage/${id}`}
                      alt="gameandactivity_activityimage"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write game or activity name"
                  className="form-control"
                  onChange={(e) => {
                    setName(e.target.value);
                    validateName(e.target.value);
                  }}
                />
                {nameError && <p className="text-danger">{nameError}</p>}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="write a desciption about the game or activity"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={guidelines}
                  placeholder="write guidlines for the game or activity"
                  className="form-control"
                  onChange={(e) => setGuidelines(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Availability of Instructor"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setInstructor(value);
                  }}
                  value={instructors}
                >
                  <Option value="1">Instructor Available</Option>
                  <Option value="0">Instructor Not Available</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE GAME OR ACTIVITY
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE GAME OR ACTIVITY
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

export default UpdateGamesAndActivities;
