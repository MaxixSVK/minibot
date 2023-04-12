# Mini bot

Discord bot made in discord.js 14 with support for slash commands, open ai api, discord build in automod and more.

## Features

 - AI - you can connect bot to Open AI api to ask him questions or generate images
 - Automod - you can configure discord build in automod
 - Moderation - clear, ban and kick command
 - Report system - system for reporting users/messages on your server for easy moderation
 - Poll - easy polls with one command
 - Easy setup - Setup a bot with one command
 - And more basic commands 

## Installation

 - You need to have installed node.js on your computer (tested 18.15.0)

 - Clone repository:
```
git clone
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
node .\deploy-commands.js
```

## Usage

```javascript
node . //start a bot
```
- Optional (after adding or deleting slash commands)

```javascript
node .\deploy-commands.js
```

- Setup bot on server (slash command)
```
/setup
```
## Customisation
 - You can edit config.json file
 - Or remake whole bot  :D

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT