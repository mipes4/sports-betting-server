const Axios = require("axios");
const apiUrlDemo = require("../config/constants").apiUrlDemo;
const Round = require("../models").round;
const apiKey = require("../config/constants").apiKey;
const apiUrl = require("../config/constants").apiUrl;

const league_id = 2673;
const getRounds = async () => {
  const response = await Axios.get(
    `${apiUrl}/fixtures/rounds/${league_id}`,

    {
      headers: {
        "X-RapidAPI-Key": apiKey,
      },
    }
  );

  const allRounds = response.data.api;
  //   console.log("What is allRounds?", allRounds);

  const fixtures = allRounds.fixtures.map((fixture) => {
    return {
      roundNr: fixture,
    };
  });
  //   console.log(fixtures);

  const savedRounds = Round.bulkCreate(fixtures, {
    updateOnDuplicate: ["roundNr"],
  });
};

// getRounds();

exports.getRounds = getRounds;
