const { Router } = require("express");
const Round = require("../models").round;

const router = new Router();

//GET all rounds
router.get("/", async (req, res, next) => {
  try {
    const myRounds = await Round.findAll();
    res.send(myRounds);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
