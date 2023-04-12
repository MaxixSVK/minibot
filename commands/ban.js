const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban user from the server..")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("User you want to ban.")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason of the ban."))
        .addIntegerOption(option =>
            option
                .setName("time")
                .setDescription("How long should be user banned.")),
    async execute(interaction) {

        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString("reason");
        const time = interaction.options.getInteger("time");

        const member = await interaction.guild.members.fetch(user.id)

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
                { name: "Duration:", value: `${time}`, inline: true },
            )

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            if (interaction.guild.owner !== interaction.author)
                return interaction.reply({ embeds: [lowembed] })

        member.ban({ days: time, reason: reason })
        await interaction.reply({ embeds: [banembed] });
    },
};