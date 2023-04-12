const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bot")
        .setDescription("See info about bot."),
    async execute(interaction) {

        const botembed = new EmbedBuilder()
            .setColor(config.Color)
            .setTitle("Mini bot")
            .setURL("https://discord.js.org/")
            .setDescription("ALPHA version - new AI support ")
            .addFields(
                { name: "Version:", value: "0.25", inline: true },
                { name: "Author:", value: "Maxix#0839", inline: true },
            )
            .setImage("https://i.imgur.com/AfFp7pu.png")


        await interaction.reply({ embeds: [botembed] });
    },
};