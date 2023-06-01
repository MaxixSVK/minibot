const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute user in the server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("User you want to mute.")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("time")
                .setRequired(true)
                .setDescription("How long should be user muted."))
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason of the mute.")),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(user.id)
        const reason = interaction.options.getString("reason") || "No reason provided";
        const time = interaction.options.getString("time");
        const convertedtime = ms(time);

        const lowembed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Can't mute user")
            .setDescription(`The ${user} has a higher role than you.`)

        const muteembed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Muted")
            .setDescription(`The ${user} was muted.`)
            .addFields(
                { name: "Reason:", value: `${reason}`, inline: true },
                { name: "Duration:", value: `${time}`, inline: true },
            )
            
        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            if (interaction.guild.owner !== interaction.author)
                return interaction.reply({ embeds: [lowembed], ephemeral: true })

        member.timeout(convertedtime, reason)
        await interaction.reply({ embeds: [muteembed], ephemeral: true });
    },
};