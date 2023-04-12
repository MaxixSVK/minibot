const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Report message')
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const channel = interaction.guild.channels.cache.find(channel => channel.name === "reports")

        const errorembed = new EmbedBuilder()
            .setTitle("Error - Report channel is not set.")
            .setDescription("Please contact server administrator.")
            .setColor("Red")

        if (channel === undefined) {
            return interaction.reply({ embeds: [errorembed] })
        }

        const reportedembed = new EmbedBuilder()
        .setTitle(`The message has been reported`)
        .setDescription("Using server apps")
        .setColor("Red")
        .addFields(
            { name: "Who's message has been reported:", value: `${interaction.targetMessage.author}`, inline: false },
            { name: "Reported message:", value: `${interaction.targetMessage.content}`, inline: false },
        )

        const sentembed = new EmbedBuilder()
        .setTitle("Report has been sent successfully")
        .setDescription("Thank you for making this server a better place.")
        .setColor("Green")

        await channel.send({ embeds: [reportedembed] })
        return interaction.reply({ embeds: [sentembed], ephemeral: true });
    }
}