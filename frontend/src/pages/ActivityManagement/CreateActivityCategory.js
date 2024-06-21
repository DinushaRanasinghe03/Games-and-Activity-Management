import React, { useEffect, useState } from "react";
import AdminActivityMenu from "../../components/Layout/AdminActivityMenu";
import axios from "axios";
//import toast from "react-hot-toast";
import toast, { Toaster } from "react-hot-toast";
import ActivityCategoryForm from "../../components/Form/ActivityCategoryForm";
import { Modal } from "antd";
import Layout from "../../components/Layout/Layout";

export const CreateActivityCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/activitycategory/create-activitycategory",
        { name }
      );
      if (data?.success) {
        toast.success(`Activity category is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //get all games and activity categories
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

  //update games and activity category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/activitycategory/update-activitycategory/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`Activity category is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong when updating category");
    }
  };
  //delete games and activity category
  const handleDelete = async (pId) => {
    // Ask for confirmation before deleting
    const confirmed = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirmed) return; // If not confirmed, do nothing

    try {
      const { data } = await axios.delete(
        `/api/v1/activitycategory/delete-activitycategory/${pId}`
      );
      if (data.success) {
        toast.success(`Activity category is deleted`);
        setUpdatedName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong when updating category");
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
            <h1>Manage Activity Category </h1>
            <div className="p-3 w-50">
              <ActivityCategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Activity Category Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            EDIT
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <ActivityCategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
};

export default CreateActivityCategory;
