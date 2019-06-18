# Wumpus and the Octocat

A Discord bot which prints out messages when an event happens on
connected GitHub repositories.

## Installation

To start running this bot, first register a new application
under [Discord Developers][1] and retrieve the token from the
created bot.

Add this token to a new `./config/local.js` file which matches
the layout of the existing `./config/default.js` file. Any
channels to be registered with this bot should be added to
the list with their ID (as found on any given Discord server).

To run this bot, Node is required, and the command:

```bash
npm start
```

[1]: https://discordapp.com/developers/applications/
