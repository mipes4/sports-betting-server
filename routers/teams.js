const { Router } = require("express");
const Team = require("../models").team;

const router = new Router();

// GET all scores
router.get("/", async (req, res, next) => {
  try {
    const response = await Team.findAll();
    res.send(response);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
