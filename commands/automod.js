const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("automod")
        .setDescription("Ai will generete you a image.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("keyword")
                .setDescription("1")
                .addStringOption(option =>
                    option
                        .setName("word")
                        .setDescription(".")
                        .setRequired(true))

        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("mention-spam")
                .setDescription("1")
                .addIntegerOption(option =>
                    option
                        .setName("number")
                        .setDescription(".")
                        .setRequired(true))

        ),
    async execute(interaction) {

        const { guild, options } = interaction
        const sub = options.getSubcommand();

        const word = interaction.options.getString("word");
        const number = interaction.options.getInteger("number");
        switch (sub) {
            case "keyword":

                await interaction.deferReply();
                await guild.autoModerationRules.create({
                    name: `${word}`,
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
                                customMessage: "blocked"
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply("error")
                    }, 2000)
                });

                interaction.editReply("nice")
                break;


            case "mention-spam":

                await interaction.deferReply();
                const mentionspam = await guild.autoModerationRules.create({
                    name: `Prevent spam mentions`,
                    creatorId: process.env.botId,
                    enabled: true,
                    eventType: 1,
                    triggerType: 5,
                    triggerMetadata:
                    {
                        mentionTotalLimit: number
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: "blocked"
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply("error")
                    }, 2000)
                });

                interaction.editReply("nice")
                break;
        }
    }
}