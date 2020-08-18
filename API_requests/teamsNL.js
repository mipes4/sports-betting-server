const Axios = require("axios");
const apiUrlDemo = require("../config/constants").apiUrlDemo;
const Team = require("../models").team;
const apiKey = require("../config/constants").apiKey;
const apiUrl = require("../config/constants").apiUrl;

const getTeams = async () => {
  const response = await Axios.get(
    `${apiUrl}/teams/search/Netherlands`,

    {
      headers: {
        "X-RapidAPI-Key": apiKey,
      },
    }
  );

  const allTeams = response.data.api;
  const fixtures = allTeams.teams.map((team) => {
    return {
      id: team.team_id,
      name: team.name,
      logo: team.logo,
    };
  });

  const savedTeams = Team.bulkCreate(fixtures, {
    updateOnDuplicate: ["id"],
  });
};

exports.getTeams = getTeams;
