const { Events, ChannelType, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === "CreateTicket") {
            let x = Math.floor((Math.random() * 100000) + 1);
            const roleid = interaction.guild.roles.cache.find(role => role.name);
            interaction.guild.channels.create({
                name: `Ticket${x}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: roleid.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            })

            const ticketcreated = new EmbedBuilder()
            .setTitle("Your ticket has been created")
            .setDescription("Support will help you soon.")
            .setColor("Green")

            interaction.reply({ embeds: [ticketcreated], ephemeral: true });
        }
    }
};