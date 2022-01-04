# poke2-farmer
A script for farming pokemons on Discord

# Table of Contents
- [poke2-farmer](#poke2-farmer)
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Authorization Token](#authorization-token)

# Prerequisites
- [Node.js](https://nodejs.org/en/)
- A Discord account which already chose a starter pokemon.
- (Optional) Another Discord account.
- A Discord bot.
- A server where you can spam chat with 2 acounts above are members and the discord bot which can read messages in this server.

# Usage
1. Clone this repository and change working directory to this repository.
2. Create a `.env` [file](https://www.npmjs.com/package/dotenv#usage) with the following variables:
   1. DISCORD_TOKEN is your discord bot token.
   2. DISCORD_AUTH_1 is the authorization token of your *main* Discord account. [Click here](#authorization-token) to learn how to obtain this token.
   3. DISCORD_AUTH_2 is the authorization token of your *clone* Discord account(You can also put your main account's token here too).
   4. SPAM_CHANNEL_ID is the channel ID where you are allowed to spam.
3. Run `npm start`

# Authorization Token
This are steps on how to obtain this token:
1. Log in [Discord](https://discord.com/) with a browser.
2. Open the developer's console on your browser and select *Network* tab.
3. Send a message in Discord and you will see a POST request, click on that request.
4. Find *Authorization* field in the request headers and the value of that field is the token we need.