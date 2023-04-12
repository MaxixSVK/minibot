const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report")
        .setDescription("Report a member to server moderators.")
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("User you want to report.")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason of the report.")
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser("target");
		const reason = interaction.options.getString("reason");
        const channel = interaction.guild.channels.cache.find(channel => channel.name === "reports")

        const errorembed = new EmbedBuilder()
            .setTitle("Error - Report channel is not set.")
            .setDescription("Please contact server administrator.")
            .setColor("Red")

        if (channel === undefined) {
            return interaction.reply({ embeds: [errorembed] })
        }

        const reportedembed = new EmbedBuilder()
        .setTitle(`The user has been reported`)
        .setDescription(`Reason: ${reason}`)
        .setColor("Red")
        .addFields(
            { name: "Reported user:", value: `${target}`, inline: true },
        )

        const sentembed = new EmbedBuilder()
        .setTitle("Report has been sent successfully")
        .setDescription("Thank you for making this server a better place.")
        .setColor("Green")

        await channel.send({ embeds: [reportedembed] })
        return interaction.reply({ embeds: [sentembed], ephemeral: true });
    },
};