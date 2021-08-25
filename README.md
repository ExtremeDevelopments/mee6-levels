## About
mee6-levels is a API wrapper that uses a undocumented MEE6 API to allow you access to full guild level information or individual user information.

## Installation
```bash
npm i mee6-levels --save
```

## Usage
```js
const MEE6 = require("mee6-levels");

MEE6.fetchLeaderboard(GUILD_ID).then(users => {
  console.log(users);
});

MEE6.fetchUser(GUILD_ID, USER_ID).then(user => {
  console.log(user);
});

MEE6.fetchRewards(GUILD_ID).then(rewards => {
  console.log(rewards);
});
```
All ID fields can be passed as a guild or user object as long as Object#id is able to be called on it.

## Help

Need help? Feel free to shoot me a dm on discord at Extreme#1000!