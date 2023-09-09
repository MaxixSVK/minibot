const { Events, ActivityType } = require("discord.js");
const config = require("../config.json");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        if (config.CommandsListOnStartup) {
            console.log("[INFO] Loaded commands:")
            console.log("----------------------------------")
            const folders = fs.readdirSync(path.join(__dirname, "../commands"));

            for (const folderjs of folders) {
                const filesjslog = fs.readdirSync(path.join(__dirname, "../commands/") + folderjs).filter(file => file.endsWith(".js"));
                console.log(folderjs.toUpperCase())
                console.log(filesjslog.toString().replaceAll(".js,", " "))
            }
            console.log("----------------------------------")
        }

        try {
            mongoose.connect(process.env.MongoDB).then(() => console.log("[INFO] Connected to MongoDB"));
        } catch (error) {
            console.log("[INFO] Couldn't connect to MongoDB")
            return
        }
        
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