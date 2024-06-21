import express from "express";

import {
  createGameAndActivityRequestController,
  deleteGamesAndActivityRequestController,
  generateDailyReportController,
  getGamesAndActivityRequestController,
  getSingleGamesAndActivityRequestController,
  updateGameAndActivityRequestController,
} from "../controllers/gamesAndActivityRequestController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

router.post(
  "/create-gameandactivityRequest",
  formidable(),
  createGameAndActivityRequestController
);

//routes

router.put(
  "/update-gameandactivityRequest/:id",
  formidable(),
  updateGameAndActivityRequestController
);

//get requests
router.get("/get-gameandactivityRequest", getGamesAndActivityRequestController);

//single request
router.get(
  "/get-gameandactivityRequest/:id",
  getSingleGamesAndActivityRequestController
);

//delete request
router.delete(
  "/delete-gameandactivityRequest/:id",
  deleteGamesAndActivityRequestController
);

// Route for generating daily report
router.get("/daily-report", generateDailyReportController);
export default router;
