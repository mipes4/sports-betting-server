const Axios = require("axios");
const apiUrlDemo = require("../config/constants").apiUrlDemo;
const Match = require("../models").match;
const apiKey = require("../config/constants").apiKey;
const apiUrl = require("../config/constants").apiUrl;
const Prediction = require("../models").predictions;
const { Op } = require("sequelize");
const Score = require("../models").score;
const calculate = require("./helperScores");

const league_id = 2673;
const getMatches = async () => {
  const response = await Axios.get(
    `${apiUrl}/fixtures/league/${league_id}`,

    {
      headers: {
        "X-RapidAPI-Key": apiKey,
      },
    }
  );

  const allFixtures = response.data.api;
  //   console.log("What is all fixture data?", allFixtures);

  // For testing purpose for now hardcoded the season-3,4,5 to future dates, status code to NS
  // and goals to null.
  // Remove the conditions below for any season to test with real data from API.
  const fixtures = allFixtures.fixtures.map((fixture) => {
    return {
      id: fixture.fixture_id,
      homeTeamId: fixture.homeTeam.team_id,
      homeTeamName: fixture.homeTeam.team_name,
      homeTeamLogo: fixture.homeTeam.logo,
      goalsHomeTeam:
        /* fixture.round === "Regular Season - 3" ||
        fixture.round === "Regular Season - 4" ||
        fixture.round === "Regular Season - 5"
          ? null
          : */ fixture.goalsHomeTeam,
      awayTeamId: fixture.awayTeam.team_id,
      awayTeamName: fixture.awayTeam.team_name,
      awayTeamLogo: fixture.awayTeam.logo,
      goalsAwayTeam:
        /*   fixture.round === "Regular Season - 3" ||
        fixture.round === "Regular Season - 4" ||
        fixture.round === "Regular Season - 5"
          ? null
          :  */ fixture.goalsAwayTeam,
      eventTimeStamp:
        /*  fixture.round === "Regular Season - 3"
          ? 1596880800
          : fixture.round === "Regular Season - 4"
          ? 1597485600
          : fixture.round === "Regular Season - 5"
          ? 1598090400
          :  */ fixture.event_timestamp,
      round: fixture.round,
      status:
        /*  fixture.round === "Regular Season - 3" ||
        fixture.round === "Regular Season - 4" ||
        fixture.round === "Regular Season - 5"
          ? "NS"
          : */ fixture.statusShort,
    };
  });
  //console.log(fixtures);

  const savedFixtures = Match.bulkCreate(fixtures, {
    updateOnDuplicate: ["id"],
  });

  //update the totalScore for players when match is finished in predictions
  //only fetching the predictions where totalScore is null and updating
  const toUpdateScore = await Prediction.findAll({
    attributes: ["predGoalsHomeTeam", "predGoalsAwayTeam", "id"],
    include: [
      {
        model: Match,
        attributes: ["goalsHomeTeam", "goalsAwayTeam"],
        where: {
          status: "FT",
          goalsHomeTeam: {
            [Op.ne]: null,
          },
          goalsAwayTeam: {
            [Op.ne]: null,
          },
        },
      },
      {
        model: Score,
        attributes: ["fullScore", "totoScore", "goalBonus"],
      },
    ],
    where: { totalScore: null },
    raw: true,
    nest: true,
  });

  if (toUpdateScore.length) {
    const calculatedScores = toUpdateScore.map((row) => {
      return {
        id: row.id,
        totalScore: calculate.calculateScore(
          {
            homeTeam: row.match.goalsHomeTeam,
            awayTeam: row.match.goalsAwayTeam,
          },
          { homeTeam: row.predGoalsHomeTeam, awayTeam: row.predGoalsAwayTeam },
          row.score
        ),
      };
    });

    const updatedScores = Prediction.bulkCreate(calculatedScores, {
      updateOnDuplicate: ["totalScore"],
    });
  }

  // setInterval(getMatches, 60 * 60 * 1000);
};

// getMatches();

exports.getMatches = getMatches;
