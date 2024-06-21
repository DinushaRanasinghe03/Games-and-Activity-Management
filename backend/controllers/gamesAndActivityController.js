//correct gamesandactivitiesController
import slugify from "slugify";
import GamesAndActivitiesModel from "../models/GamesAndActivitiesModel.js";
import fs from "fs";
import { response } from "express";

export const createGameAndActivityController = async (req, res) => {
  try {
    const {
      gameoractivitycategory,
      name,
      description,
      guidelines,
      instructors,
    } = req.fields;
    const { activityimage } = req.files;

    //validation
    switch (true) {
      case !gameoractivitycategory:
        return res
          .status(500)
          .send({ error: "Game or Activity category is required " });
      case activityimage && activityimage.size > 1000000:
        return res.status(500).send({
          error:
            "Game or Activity image is required and should be less than 1mb ",
        });
      case !name:
        return res
          .status(500)
          .send({ error: "Game or Activity name is required " });
      case !description:
        return res
          .status(500)
          .send({ error: "Game or Activity description is required " });
      case !guidelines:
        return res
          .status(500)
          .send({ error: "Game or Activity guidelines are required " });

      case !instructors:
        return res
          .status(500)
          .send({ error: "Game or Activity instructor status is required " });
    }

    const gamesandactivities = new GamesAndActivitiesModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (activityimage) {
      gamesandactivities.activityimage.data = fs.readFileSync(
        activityimage.path
      );
      gamesandactivities.activityimage.contentType = activityimage.type;
    }
    await gamesandactivities.save();
    res.status(201).send({
      success: true,
      message: "Game or Activity added successfully.",
      gamesandactivities,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating Games and Activities",
    });
  }
};

//get gameandactivity
export const getGameAndActivityController = async (req, res) => {
  try {
    const gamesandactivities = await GamesAndActivitiesModel.find({})
      .populate("gameoractivitycategory")
      .select("-activityimage")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: gamesandactivities.length,
      message: "All Games and Activities",
      gamesandactivities,
    });
  } catch (error) {
    console.log.apply(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Games and Activities",
      error: error.message,
    });
  }
};
//get single game and activity
export const getSingleGameAndActivityController = async (req, res) => {
  try {
    const gamesandactivities = await GamesAndActivitiesModel.findOne({
      slug: req.params.slug,
    })
      .select("-activityimage")
      .populate("gameoractivitycategory");
    res.status(200).send({
      success: true,
      message: "Single Game and Activity Fetched",
      gamesandactivities,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Single Game and Activity",
      error,
    });
  }
};

// get activity image
export const gameandactivityImageController = async (req, res) => {
  try {
    const gameandactivity = await GamesAndActivitiesModel.findById(
      req.params.apid
    ).select("activityimage");
    if (gameandactivity.activityimage.data) {
      res.set("Content-type", gameandactivity.activityimage.contentType);
      return res.status(200).send(gameandactivity.activityimage.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting activity image",
      error,
    });
  }
};

//delete Game And Activity Controller
export const deleteGameAndActivityController = async (req, res) => {
  try {
    await GamesAndActivitiesModel.findByIdAndDelete(req.params.apid).select(
      "-activityimage"
    );
    res.status(200).send({
      success: true,
      message: "Game or Activity Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Deleting Game Or Actvity",
      error,
    });
  }
};

//update Game And Activity Controller
export const updateGameAndActivityController = async (req, res) => {
  try {
    const {
      gameoractivitycategory,
      name,
      slug,
      description,
      guidelines,
      instructors,
    } = req.fields;
    const { activityimage } = req.files;

    //validation
    switch (true) {
      case !gameoractivitycategory:
        return res
          .status(500)
          .send({ error: "Game or Activity category is required " });
      case activityimage && activityimage.size > 1000000:
        return res.status(500).send({
          error:
            "Game or Activity image is required and should be less than 1mb ",
        });
      case !name:
        return res
          .status(500)
          .send({ error: "Game or Activity name is required " });
      case !description:
        return res
          .status(500)
          .send({ error: "Game or Activity description is required " });
      case !guidelines:
        return res
          .status(500)
          .send({ error: "Game or Activity guidelines are required " });

      case !instructors:
        return res
          .status(500)
          .send({ error: "Game or Activity instructor status is required " });
    }

    const gamesandactivities = await GamesAndActivitiesModel.findByIdAndUpdate(
      req.params.apid,
      { ...req.fields, slug },
      { new: true }
    );

    if (activityimage) {
      gamesandactivities.activityimage.data = fs.readFileSync(
        activityimage.path
      );
      gamesandactivities.activityimage.contentType = activityimage.type;
    }
    await gamesandactivities.save();
    res.status(201).send({
      success: true,
      message: "Game or Activity updated successfully.",
      gamesandactivities,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating Games and Activities",
    });
  }
};

//filter
export const gameandactivityFiltersController = async (req, res) => {
  try {
    const { checked } = req.body;
    let args = {};
    if (checked) args.gameoractivitycategory = checked;
    const gamesandactivities = await GamesAndActivitiesModel.find(args);
    res.status(200).send({
      success: true,
      gamesandactivities,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering Games and Activities",
      error,
    });
  }
};

//search games and actvities
export const searchGameAndActivityController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await GamesAndActivitiesModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-activityimage");

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Search Game or Activity",
      error,
    });
  }
};

//similar games and activities
export const relatedGameAndActivityController = async (req, res) => {
  try {
    const { aid, cid } = req.params;
    const gamesandactivities = await GamesAndActivitiesModel.find({
      gameoractivitycategory: cid,
      _id: { $ne: aid },
    })
      .select("-activityimage")
      .limit(3)
      .populate("gameoractivitycategory");
    res.status(200).send({
      success: true,
      gamesandactivities,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting similar Games and Activities ",
      error,
    });
  }
};
