# Mini Bot

## Discord bot made with discord.js v14.
Please note that this bot is still under development

## Features
 - AI - you can connect the bot to the Open AI api to ask it questions or generate images
 - Ticket system - easy way to provide support
 - Moderation - clear, ban and kick command
 - Report system - system for reporting users/messages on your server for easy moderation
 - Poll - simple polls with a single command
 - Automod - you can configure discord build in automod
 - Easy setup - set up a bot with a single command
 - Connect to MongoDB
 - And other basic commands

## Installation
 - You need to have [node.js](https://nodejs.org/) installed on your machine (tested version 18.17.0)

 - Clone repository (or for more stable experience you can download newest release)
```
git clone https://github.com/MaxixSVK/minibot
```

- Install dependencies:
```
npm install
```

 - Create the .env file and fill it with your credentials
 ```
token = discord bot token => discord delelopers web, bot section
clientId = discord client id => discord delelopers web, OAuth2 section
botId = <discord app = right click on bot => copy ID (needs developer mode enabled)
OPENAI_API_KEY = OpenAI website
MongoDB = MongoDB dashbord => connect => drivers / local link
 ```

 - Deploy slash commands
```
node src/deployCommands.js
```

## Usage
 - Start a bot
```
npm start
```

- After deleting, editing, or adding slash commands
```
node src/deployCommands.js
```

## Website
 - If you want website for your bot check out my other [project](https://github.com/MaxixSVK/discord-bot-web-template.git) or clone it like this
```
git clone https://github.com/MaxixSVK/discord-bot-web-template
```

## Future updates
 - New automoderation features

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

MIT
