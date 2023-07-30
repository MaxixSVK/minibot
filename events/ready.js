const { Events, ActivityType } = require('discord.js');
const config = require("../config.json");
const fs = require('fs');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        if (config.CommandsListOnStartup) {
            console.log("\n[INFO] Loaded commands:")
            console.log("----------------------------------")
            const folders = fs.readdirSync('commands');

            for (const folderjs of folders) {
                const filesjslog = fs.readdirSync('commands/' + folderjs).filter(file => file.endsWith(".js"));
                console.log(folderjs.toUpperCase())
                console.log(filesjslog.toString().replaceAll(".js,", " "))
            }     
            console.log("----------------------------------")
            console.log("") 
        }
        console.log(`[INFO] Successfully started bot`)
        console.log(`[INFO] Logged in as ${client.user.tag}`);
        client.user.setPresence({
            activities: [{
                name: "everyone :)",
                type: ActivityType.Listening
            }],
            status: "online"
        });
    }
};