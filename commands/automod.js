const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("automod")
        .setDescription("Set discord automod features.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("keyword")
                .setDescription("Block specific words.")
                .addStringOption(option =>
                    option
                        .setName("word")
                        .setDescription("The word you want to block.")
                        .setRequired(true))

        ),
    async execute(interaction) {

        const word = interaction.options.getString("word");

        const successembed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Success")
            .setDescription(`Changes have been implemented`)

        const { guild, options } = interaction
        const sub = options.getSubcommand();

        switch (sub) {
            case "keyword":
                await guild.autoModerationRules.create({
                    name: "Keyword block",
                    creatorId: process.env.botId,
                    enabled: true,
                    eventType: 1,
                    triggerType: 1,
                    triggerMetadata:
                    {
                        keywordFilter: [`${word}`]
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.reply("error")
                    }, 2000)
                });

                interaction.reply({ embeds: [successembed], ephemeral: true })
                break;
        }
    }
}