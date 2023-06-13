const { SlashCommandBuilder, EmbedBuilder, } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("See info about user.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("See information about this user.")
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const created = Math.floor(user.createdTimestamp/1000)

        const userembed = new EmbedBuilder()
            .setColor(config.Color)
            .setTitle(`${user.username}`)
            .addFields(
                { name: ":busts_in_silhouette: Name:", value: `${user.username}`, inline: true },
                { name: ":calendar: Account created:", value: `<t:${created}:d>`, inline: true },
                { name: ":robot: Bot:", value: `${user.bot}`, inline: true },
                { name: ":id: ID:", value: `${user.id}`, inline: true },
            )

        await interaction.reply({ embeds: [userembed] });
    },
};