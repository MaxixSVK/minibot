const {  SlashCommandBuilder, ChannelType, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Setup all features for server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        await interaction.deferReply();

        const reportschannel = interaction.guild.channels.cache.find(channel => channel.name == "reports");
        const ticketchannel = interaction.guild.channels.cache.find(channel => channel.name == "tickets");

        const setupembed = new EmbedBuilder()
            .setTitle("Setup has been completed.")
            .setDescription("If you don't see a new channel, check browse channels feature.")
            .setColor("Green")

        const alredyembed = new EmbedBuilder()
            .setTitle("Setup has been alredy completed.")
            .setDescription("If you don't see a channels (reports and tickets), check browse channels feature.")
            .setColor("Yellow")

        const ticketmessageembed = new EmbedBuilder()
            .setTitle("Ticket")
            .setDescription("A rigt way to contact a server support.")
            .setColor("Green")

        const createticketbutton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('CreateTicket')
                    .setLabel('Create Ticket')
                    .setStyle(ButtonStyle.Primary),
            );

        if ((reportschannel) && (ticketchannel)) {
            interaction.followUp({ embeds: [alredyembed] });
            return
        }

        if (!reportschannel) {
            interaction.guild.channels.create({
                name: "reports",
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
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
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.SendMessages],
                    },
                ],
            })

            setTimeout(() => {
                const ticketchannel = interaction.guild.channels.cache.find(channel => channel.name == "tickets");
                ticketchannel.send({ embeds: [ticketmessageembed], components: [createticketbutton] });
               }, 1500);
            }

        await interaction.followUp({ embeds: [setupembed] });
    },
};