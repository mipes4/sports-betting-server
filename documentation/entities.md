## Entities

### User

| Key              | Datatypes | Required | Notes                                              |
| ---------------- | --------- | -------- | -------------------------------------------------- |
| id               | pk        | yes      | Already added by model:generate                    |
| username         | string    | yes      | unique: true, default 'user {User.id.length + 1}'  |
| email            | string    | yes      |                                                    |
| password         | string    | yes      | default 'password'                                 |
| frontName        | string    | yes      | default 'frontName'                                |
| lastName         | string    | yes      | default 'lastName'                                 |
| phoneNumber      | string    | yes      | validation in frontend form for pattern            |
| admin            | boolean   | no       | default false                                      |
| totaalToto       | boolean   | no       | default true                                       |
| createdAt        | date      | yes      | Already added by model:generate                    |
| updatedAt        | date      | yes      | Already added by model:generate                    |
| clubPreferenceId | integer   | no       | Foreign key (references API GET team/search/{name} |

##### Relations:

- a user (clubPreferenceId) belongs to API GET team/search/{name}
- a user has many predictions

### Prediction

| Key               | Datatypes | Required | Notes                            |
| ----------------- | --------- | -------- | -------------------------------- |
| id                | pk        | yes      | Already added by model:generate  |
| predGoalsHomeTeam | integer   | yes      |                                  |
| predGoalsAwayTeam | integer   | yes      |                                  |
| createdAt         | date      | yes      | Already added by model:generate  |
| updatedAt         | date      | yes      | Already added by model:generate  |
| fixtureId         | integer   | yes      | Foreign key (references matches) |
| userId            | integer   | yes      | Foreign key (references user)    |
| scoreId           | integer   | yes      | Foreign key (references score)   |

##### Relations:

- a prediction (matchId) belongs matches
- a prediction (userId) belongs to user
- a prediction (scoreId) belongs to score

### Matches

| Key            | Datatypes | Required | Notes                             |
| -------------- | --------- | -------- | --------------------------------- |
| id             | pk        | yes      | Can this be filled by fixture_Id? |
| homeTeamId     | integer   | yes      |                                   |
| homeTeamName   | string    | yes      |                                   |
| homeTeamLogo   | string    | no       |                                   |
| goalsHomeTeam  | integer   | no       |                                   |
| awayTeamId     | integer   | yes      |                                   |
| awayTeamName   | string    | yes      |                                   |
| awayTeamLogo   | string    | no       |                                   |
| goalsAwayTeam  | integer   | no       |                                   |
| eventTimeStamp | integer   | no       |                                   |
| round          | string    | no       |                                   |
| status         | string    | no       |                                   |

##### Relations:

- a match has many predictions

### Score

| Key       | Datatypes | Required | Notes                           |
| --------- | --------- | -------- | ------------------------------- |
| id        | pk        | yes      | Already added by model:generate |
| fullScore | integer   | yes      |                                 |
| totoScore | integer   | yes      |                                 |
| goalBonus | integer   | yes      |                                 |
| createdAt | date      | yes      | Already added by model:generate |
| updatedAt | date      | yes      | Already added by model:generate |

##### Relations:

- a score is used by many predictions
