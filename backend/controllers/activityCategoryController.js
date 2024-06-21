import activityCategoryModel from "../models/activityCategoryModel.js";
import slugify from "slugify";
import router from "../routes/activityCategoryRoutes.js";
export const createActivityCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(401)
        .send({ message: "Activities and Games Category Name is Required" });
    }

    const existingCategory = await activityCategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Activities and Games Category Already Exists in the System.",
      });
    }

    const category = await new activityCategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Category Created Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Activity and Games Category",
    });
  }
};

//update activity category
export const updateActivityCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await activityCategoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Games and Activities Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      error,
      message: "Error while updating Games and Activities Category",
    });
  }
};

//get all category
export const activityCategoryController = async (req, res) => {
  try {
    const category = await activityCategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Games and Activities",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Games and Activities Categories",
    });
  }
};

//get single category
export const singleActivityCategoryController = async (req, res) => {
  try {
    const category = await activityCategoryModel.findOne({
      slug: req.params.slug,
    });
    res.status(200).send({
      success: true,
      message: "Get single Activity category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};

//delete category
export const deleteActivityCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await activityCategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Games and Activities Category Deleted Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Activities and Game Category",
    });
  }
};
