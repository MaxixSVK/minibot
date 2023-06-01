const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick user from the server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("User you want to kick.")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason of the kick.")),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString("reason") || "No reason provided";
        const member = await interaction.guild.members.fetch(user.id)

        const lowembed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Can't kick user")
            .setDescription(`The ${user} has a higher role than you.`)

        const kickembed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Kicked")
            .setDescription(`The ${user} was kicked from server.`)
            .addFields(
                { name: "Reason:", value: `${reason}`, inline: true },
            )

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            if (interaction.guild.owner !== interaction.author)
                return interaction.reply({ embeds: [lowembed], ephemeral: true })

        member.kick(reason)
        await interaction.reply({ embeds: [kickembed], ephemeral: true });
    },
};