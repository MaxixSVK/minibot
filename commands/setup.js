const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

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

        const ticketmessageembed = new EmbedBuilder()
            .setTitle("ha")
            .setDescription("ha")
            .setColor("Green")

        const createticketbutton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('CreateTicket')
                    .setLabel('Create Ticket')
                    .setStyle(ButtonStyle.Primary),
            );

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
            const ticketchannelmessage = interaction.guild.channels.cache.get('1112700323379826698');
            ticketchannelmessage.send({ embeds: [ticketmessageembed], components: [createticketbutton] });
        }

        await interaction.reply({ embeds: [setupembed], ephemeral: true });
    },
};