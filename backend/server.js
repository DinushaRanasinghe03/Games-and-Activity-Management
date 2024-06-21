import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import activityCategoryRoutes from "./routes/activityCategoryRoutes.js";
import gamesAndActivitiesRoutes from "./routes/gamesAndActivitiesRoutes.js";
import gamesAndActivitiesRequestRoutes from "./routes/gamesAndActivitiesRequestRoutes.js";
import cors from "cors";

//configure env
dotenv.config();

//database config
connectDB();
//rest object
const app = express();

//middlewears
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/activitycategory", activityCategoryRoutes);
app.use("/api/v1/gameandactivity", gamesAndActivitiesRoutes);
app.use("/api/v1/gameandactivityRequest", gamesAndActivitiesRequestRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to leisurehub</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
