const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban user from the server..")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("User you want to ban.")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason of the ban.")),
    async execute(interaction) {

        const user = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(user.id)
        const reason = interaction.options.getString("reason") || "No reason provided";

        const lowembed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Can't ban user")
            .setDescription(`The ${user} has a higher role than you.`)

        const banembed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Banned")
            .setDescription(`The ${user} was banned from server`)
            .addFields(
                { name: "Reason:", value: `${reason}`, inline: true },
            )

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            if (interaction.guild.owner !== interaction.author)
                return interaction.reply({ embeds: [lowembed], ephemeral: true })

        member.ban({ reason })
        await interaction.reply({ embeds: [banembed], ephemeral: true });
    },
};