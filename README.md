# Sports betting app :soccer:

This is the server repository for my portfolio project Sports betting app. For more details, please refer to the README of the [client repository](https://github.com/mipes4/sportsbetting_fe).

### Table of contents

- [BACK END OF THE APP](#back-end-of-the-app)
- [SETUP](#setup)

## BACK END OF THE APP

The Sports betting app is an MVP, not a final version. The beginning of the web app is there, but there is so much more on my wishlist. Take a look at my [projectboard](https://github.com/users/mipes4/projects/1) to know what is going to be done in the future. For optimal use of the Sports betting app I had to fetch data from an external API to store in a Postgres database. On this way I made it possible to relate the predictions on matches without entering matches manually.

- [UML diagram](https://app.lucidchart.com/documents/view/c81baaf7-43c2-4036-9dfa-24f6784c027a)

## SETUP :electric_plug:

In config/constants and config/config there are listed a few process.env variables. Please replace the values with your own keys in a .env file:

- DATABASE_DEV=[Your postgres database (example)](https://www.elephantsql.com/)
- API_URL_DEMO=[The demo URL from https://www.api-football.com/](https://www.api-football.com/)
- API_URL=[The API URL from https://www.api-football.com/](https://www.api-football.com/)
- API_KEY=[The API Key from https://www.api-football.com/](https://www.api-football.com/)

### Available Scripts

:grey_exclamation: **NOTE** :grey_exclamation:
The backend can fill the database with seeding files for demo and development purposes but also fills table Matches and Rounds with data fetched from an external API. See [SETUP](#setup) for entering your own API keys.

In the project directory, you can run:

#### `npm run dev`

Runs the app in the development mode.
Open http://localhost:4000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run initdev`

Migrates the Postgres database using Sequelize-Cli and seed the database with some seeding files made for demo and development purposes.
