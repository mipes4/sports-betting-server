const { Router } = require("express");
const Prediction = require("../models").predictions;
const sequelize = require("sequelize");
const Match = require("../models").match;

const router = new Router();

// Create prediction
router.post("/", async (req, res, next) => {
  const {
    predGoalsHomeTeam,
    predGoalsAwayTeam,
    userId,
    scoreId,
    matchId,
  } = req.body;

  //   console.log(req.body);

  if (
    !predGoalsHomeTeam ||
    !predGoalsAwayTeam ||
    !userId ||
    !scoreId ||
    !matchId
  ) {
    return res.status(400).send("Please provide everything");
  }

  try {
    const newPrediction = await Prediction.create({
      predGoalsHomeTeam,
      predGoalsAwayTeam,
      userId,
      scoreId,
      matchId,
    });
    // console.log(newPrediction);

    res.status(201).json({ ...newPrediction.dataValues });
  } catch (error) {
    next(error);
  }
});

// Update prediction
router.patch("/prediction/:predictionId", async (req, res, next) => {
  const { predictionId } = req.params;
  console.log("What is my predictionId?", predictionId);
  try {
    const predictionToUpdate = await Prediction.findByPk(predictionId);
    //Fetch prediction info from API await axios.get predictionId
    if (!predictionToUpdate) {
      res.status(404).send("Prediction not found");
    } else {
      const updatedPrediction = await predictionToUpdate.update(req.body);
      res.json(updatedPrediction);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
