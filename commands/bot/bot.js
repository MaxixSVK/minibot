const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bot")
        .setDescription("See info about bot."),
    async execute(interaction) {
        const botembed = new EmbedBuilder()
            .setColor(config.Color)
            .setTitle("Mini bot")
            .setURL("https://github.com/MaxixSVK/minibot")
            .addFields(
                { name: ":speech_balloon: Version:", value: "0.4.2", inline: true },
                { name: ":busts_in_silhouette: Author:", value: "Maxix", inline: true },
            )
            .setImage("https://i.imgur.com/AfFp7pu.png")

        await interaction.reply({ embeds: [botembed] });
    },
};