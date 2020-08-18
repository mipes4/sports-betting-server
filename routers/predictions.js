const { Router } = require("express");
const Prediction = require("../models").predictions;
const sequelize = require("sequelize");
const Match = require("../models").match;
const User = require("../models").user;

const { Op } = require("sequelize");

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
router.patch("/:predictionId", async (req, res, next) => {
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

// GET all toto scores
router.get("/", async (req, res, next) => {
  try {
    const predictions = await Prediction.findAll({
      attributes: [
        "userId",
        [
          sequelize.fn("SUM", sequelize.col("predictions.totalScore")),
          "totalScore",
        ],
      ],
      include: {
        model: User,
        attributes: ["username"],
        where: { totaalToto: true },
      },
      group: ["userId", "user.id"],
      order: [[sequelize.fn("SUM", sequelize.col("totalScore")), "DESC"]],
    });
    res.send(predictions);
  } catch (e) {
    next(e);
  }
});

// GET all scores for :matchId
router.get("/match/:matchId", async (req, res, next) => {
  const { matchId } = req.params;

  try {
    const matchPrediction = await Prediction.findAll({
      attributes: [
        "userId",
        "predGoalsHomeTeam",
        "predGoalsAwayTeam",
        "totalScore",
      ],
      include: {
        model: User,
        attributes: ["username"],
      },
      where: { matchId },
      order: [["totalScore", "DESC"]],
    });
    res.send(matchPrediction);
  } catch (e) {
    next(e);
  }
});

router.get("/game/:gameId", async (req, res, next) => {
  const { gameId } = req.params;
  const seasons = [
    `Regular Season - ${gameId * 3 - 2}`,
    `Regular Season - ${gameId * 3 - 1}`,
    `Regular Season - ${gameId * 3}`,
  ];
  parseInt(gameId) === 11
    ? seasons.push(`Regular Season - ${gameId * 3 + 1}`)
    : null;
  try {
    const matchPrediction = await Prediction.findAll({
      attributes: [
        "userId",
        [
          sequelize.fn("SUM", sequelize.col("predictions.totalScore")),
          "totalScore",
        ],
      ],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Match,
          attributes: [],
          where: { round: { [Op.in]: seasons } },
        },
      ],
      group: ["userId", "user.id"],
      order: [[sequelize.fn("SUM", sequelize.col("totalScore")), "DESC"]],
    });
    res.send(matchPrediction);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
