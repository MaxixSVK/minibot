const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Setup all features for server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

        const reportschannel = interaction.guild.channels.cache.find(channel => channel.name == "reports");
        const ticketchannel = interaction.guild.channels.cache.find(channel => channel.name == "tickets");
        const roleid = interaction.guild.roles.cache.find(role => role.name);

        const setupembed = new EmbedBuilder()
            .setTitle("Setup has been completed.")
            .setDescription("If you don't see a new channel, check browse channels feature.")
            .setColor("Green")

        const alredyembed = new EmbedBuilder()
            .setTitle("Setup has been alredy completed.")
            .setDescription("If you don't see a channels (reports and tickets), check browse channels feature.")
            .setColor("Yellow")

        if ((reportschannel) && (ticketchannel)) {
            interaction.reply({ embeds: [alredyembed], ephemeral: true });
            return
        }

        if (!reportschannel) {
            interaction.guild.channels.create({
                name: "reports",
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: roleid.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            })
        }

        if (!ticketchannel) {
            interaction.guild.channels.create({
                name: "tickets",
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: roleid.guild.id,
                        deny: [PermissionsBitField.Flags.SendMessages],
                    },
                ],
            })
        }

        await interaction.reply({ embeds: [setupembed] });
    },
};