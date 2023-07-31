const { SlashCommandBuilder, EmbedBuilder, } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("See info about server."),
    async execute(interaction) {
        const server = interaction.guild.name
        const owner = await interaction.guild.fetchOwner()
        const members = interaction.guild.memberCount
        const created = Math.floor(interaction.guild.createdTimestamp/1000)
        const channels = await interaction.guild.channels.fetch()
        const roles = await interaction.guild.roles.fetch()
        const emojis = await interaction.guild.emojis.fetch()

        const botembed = new EmbedBuilder()
            .setColor(config.Color)
            .setTitle(`${server}`)
            .addFields(
                { name: ":crown: Owner:", value: `${owner}`, inline: true },
                { name: ":busts_in_silhouette: Members:", value: `${members}`, inline: true },
                { name: ":calendar: Created:", value: `<t:${created}:d>`, inline: true },
                { name: ":speech_balloon: Channels:", value: `${channels.size}`, inline: true },
                { name: ":closed_lock_with_key: Roles:", value: `${roles.size}`, inline: true },
                { name: ":earth_africa: Emojis:", value: `${emojis.size}`, inline: true },
            )

        await interaction.reply({ embeds: [botembed] });
    },
};