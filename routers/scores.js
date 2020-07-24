const { Router } = require("express");
const Score = require("../models").score;

const router = new Router();

// GET all scores
router.get("/", async (req, res, next) => {
  try {
    const response = await Score.findAll();
    res.send(response);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
