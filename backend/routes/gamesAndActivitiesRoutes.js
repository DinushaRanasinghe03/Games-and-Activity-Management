import express from "express";
import {
  createGameAndActivityController,
  deleteGameAndActivityController,
  gameandactivityFiltersController,
  gameandactivityImageController,
  getGameAndActivityController,
  getSingleGameAndActivityController,
  relatedGameAndActivityController,
  searchGameAndActivityController,
  updateGameAndActivityController,
} from "../controllers/gamesAndActivityController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
router.post(
  "/create-gameandactivity",
  formidable(),
  createGameAndActivityController
);

//update routes
router.put(
  "/update-gameandactivity/:apid",
  formidable(),
  updateGameAndActivityController
);

//get gameandactivity
router.get("/get-gameandactivity", getGameAndActivityController);

//single gameandactivity
router.get("/get-gameandactivity/:slug", getSingleGameAndActivityController);

//get photo
router.get(
  "/gameandactivity-activityimage/:apid",
  gameandactivityImageController
);

//delete gameandactivity
router.delete("/delete-gameandactivity/:apid", deleteGameAndActivityController);

//filter by category
router.post("/gameandactivity-filters", gameandactivityFiltersController);

//search games and activities
router.get("/search-gameandactivity/:keyword", searchGameAndActivityController);

//similar games and activities
router.get(
  "/related-gameandactivity/:aid/:cid",
  relatedGameAndActivityController
);

export default router;
