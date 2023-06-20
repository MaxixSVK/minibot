# Mini bot

## Discord bot made in discord.js v14.
Please note that this bot is still under development

## Features

 - AI - you can connect bot to Open AI api to ask him questions or generate images
 - Ticket system - easy way to provide support
 - Moderation - clear, ban and kick command
 - Report system - system for reporting users/messages on your server for easy moderation
 - Poll - easy polls with one command
 - Automod - you can configure discord build in automod
 - Easy setup - set up a bot with a single command
 - And other basic commands

## Installation

 - You need to have [node.js](https://nodejs.org/) installed on your machine (tested version 18.16.0)

 - Clone repository (or for more stable experience you can download newest release)
```
git clone https://github.com/MaxixSVK/minibot
``` 
- Install dependencies:

```
npm install
```

 - Create .env file
```
token=your bot token
clientId=your client id
botId=your bot id
OPENAI_API_KEY=your open ai api key
```
- Deploy slash commands
```
node deployCommands.js
```

## Usage
 - Start a bot
```
npm start
```
- After deleting or adding slash commands

```
node deployCommands.js
```

- Setup bot on server (slash command)
```
/setup
```

## Website
 - If you want website for your bot check out my other [project](https://github.com/MaxixSVK/discord-bot-web-template.git) or download it here
```
git clone https://github.com/MaxixSVK/discord-bot-web-template
```
## Customization
 - For easy customization you can edit confing.json

## Future updates
 - Better Ticket system
 - New automoderation features

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT