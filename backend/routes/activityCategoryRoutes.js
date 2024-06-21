import express from "express";
import {
  activityCategoryController,
  createActivityCategoryController,
  deleteActivityCategoryController,
  singleActivityCategoryController,
  updateActivityCategoryController,
} from "../controllers/activityCategoryController.js";
const router = express.Router();

//routes
//create category
router.post("/create-activitycategory", createActivityCategoryController);

//update category
router.put("/update-activitycategory/:id", updateActivityCategoryController);

//get all category
router.get("/get-activitycategory", activityCategoryController);
export default router;

//get single category
router.get("/single-activitycategory/:slug", singleActivityCategoryController);

//delete category
router.delete("/delete-activitycategory/:id", deleteActivityCategoryController);
