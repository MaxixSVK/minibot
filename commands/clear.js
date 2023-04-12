const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Delete specific number of messages.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("Amount of cleared messages.")
                .setRequired(true)),

    async execute(interaction) {

        const amount = interaction.options.getInteger("amount")

        const errorembed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("You can only delete between 1 and 99 messages.")
        .setColor("Red")

        if (amount < 1 || amount > 99) {
			return interaction.reply({ embeds: [errorembed], ephemeral: true });
		}

        const cleanembed = new EmbedBuilder()
        .setTitle("Cleared")
        .setDescription(`Succesfully deleted ${amount} messages.`)
        .setColor("Green")

        await interaction.channel.bulkDelete(amount, true);
        return interaction.reply({ embeds: [cleanembed], ephemeral: true });
    },
};