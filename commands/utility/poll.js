const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Make a poll.")
        .addStringOption(option =>
			option
				.setName("title")
				.setDescription("This will be title of the poll.")
				.setRequired(true))
        .addStringOption(option =>
            option
                .setName("option1")
                .setDescription("Option1")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("option2")
                .setDescription("Option2")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("option3")
                .setDescription("Option3"))
        .addStringOption(option =>
            option
                .setName("option4")
                .setDescription("Option4")),
    async execute(interaction) {
        const title = interaction.options.getString("title");
        const option1 = interaction.options.getString("option1");
        const option2 = interaction.options.getString("option2");
        const option3 = interaction.options.getString("option3");
        const option4 = interaction.options.getString("option4");

        const pollembed12 = new EmbedBuilder()
            .setColor(config.Color)
            .setTitle(`${title}`)
            .setDescription(`1: ${option1}\n2: ${option2}`)

        const pollembed123 = new EmbedBuilder()
            .setColor(config.Color)
            .setTitle(`${title}`)
            .setDescription(`1: ${option1}\n2: ${option2}\n3: ${option3}`)

        const pollembed1234 = new EmbedBuilder()
            .setColor(config.Color)
            .setTitle(`${title}`)
            .setDescription(`1: ${option1}\n2: ${option2}\n3: ${option3}\n4: ${option4}`)

        if ((option1) && (option2)) {
            if (option3) {
                if (option4) {
                    interaction.reply({ embeds: [pollembed1234] })
                    const replied = await interaction.fetchReply();
                    replied.react("1️⃣");
                    replied.react("2️⃣");
                    replied.react("3️⃣");
                    replied.react("4️⃣");
                    return
                }
                else {
                    interaction.reply({ embeds: [pollembed123] })
                    const replied = await interaction.fetchReply();
                    replied.react("1️⃣");
                    replied.react("2️⃣");
                    replied.react("3️⃣");
                    return
                }
            }
            interaction.reply({ embeds: [pollembed12] })
            const replied = await interaction.fetchReply();
            replied.react("1️⃣");
            replied.react("2️⃣");
        }
    }
}