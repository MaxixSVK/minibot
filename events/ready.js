const { Events, ActivityType } = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setPresence({
            activities: [{
                name: config.ActivityName,
                type: ActivityType.Listening
            }],
            status: config.StatusType
        });
    }
};