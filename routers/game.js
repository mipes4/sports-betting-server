const { Router } = require("express");
const Match = require("../models").match;

const { Op } = require("sequelize");

const router = new Router();

// GET the current game
router.get("/", async (req, res, next) => {
  try {
    const dateNow = Math.floor(Date.now() / 1000);
    const round = await Match.findAll({
      attributes: ["round"],
      where: { eventTimeStamp: { [Op.lt]: dateNow } },
      order: [["eventTimeStamp", "DESC"]],
      limit: 1,
    });
    res.send(round);
  } catch (e) {
    next(e);
  }
});

// GET the current round
router.get("/currentround", async (req, res, next) => {
  try {
    const dateNow = Math.floor(Date.now() / 1000);
    const round = await Match.findAll({
      attributes: ["round"],
      where: { eventTimeStamp: { [Op.lte]: dateNow - 24 * 60 * 60 } },
      order: [["eventTimeStamp", "DESC"]],
      limit: 1,
    });
    res.send(round);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
