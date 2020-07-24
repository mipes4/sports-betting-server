require("dotenv").config();
const { Router } = require("express");
const express = require("express");
const corsMiddleWare = require("cors");
const authMiddleWare = require("./auth/middleware");
const { PORT } = require("./config/constants");
const predictionRouter = require("./routers/predictions");
const scoresRouter = require("./routers/scores");
const matchesRouter = require("./routers/matches");
const authRouter = require("./routers/auth");
const roundRouter = require("./routers/rounds");
const matches = require("./API_requests/matches");
const rounds = require("./API_requests/rounds");

const app = express();
const router = new Router();

matches.getMatches();
rounds.getRounds();

/**
 *
 * cors middleware:
 *
 * Since our api is hosted on a different domain than our client
 * we are are doing "Cross Origin Resource Sharing" (cors)
 * Cross origin resource sharing is disabled by express by default
 * for safety reasons (should everybody be able to use your api, I don't think so!)
 *
 * We are configuring cors to accept all incoming requests
 * If you want to limit this, you can look into "white listing" only certain domains
 *
 * docs: https://expressjs.com/en/resources/middleware/cors.html
 *
 */

app.use(corsMiddleWare());

/**
 *
 * express.json():
 * be able to read request bodies of JSON requests
 * a.k.a. body-parser
 * Needed to be able to POST / PUT / PATCH
 *
 * docs: https://expressjs.com/en/api.html#express.json
 *
 */

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

/**
 *
 * delay middleware
 *
 * Since our api and client run on the same machine in development mode
 * the request come in within milliseconds
 * To simulate normal network traffic this simple middleware delays
 * the incoming requests by 1500 second
 * This allows you to practice with showing loading spinners in the client
 *
 * - it's only used when you use npm run dev to start your app
 * - the delay time can be configured in the package.json
 */

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

/**
 *
 * authMiddleware:
 *
 * When a token is provided:
 * decrypts a jsonwebtoken to find a userId
 * queries the database to find the user with that add id
 * adds it to the request object
 * user can be accessed as req.user when handling a request
 * req.user is a sequelize User model instance
 *
 * When no or an invalid token is provided:
 * returns a 4xx reponse with an error message
 *
 * check: auth/middleware.js
 *
 * For fine grained control, import this middleware in your routers
 * and use it for specific routes
 *
 * for a demo check the following endpoints
 *
 * POST /authorized_post_request
 * GET /me
 *
 */

/**
 *
 * When going into live mode, change apiUrlDemo into apiUrl and uncomment headers
 *
 */

app.use(corsMiddleWare());

app.use("/predictions", predictionRouter);
app.use("/matches", matchesRouter);
app.use("/scores", scoresRouter);
app.use("/", authRouter);
app.use("/rounds", roundRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = router;
