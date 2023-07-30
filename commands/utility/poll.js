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
                .setName("option-1")
                .setDescription("This will be option 1 in poll. (Required)")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("option-2")
                .setDescription("This will be option 2 in poll. (Required)")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("option-3")
                .setDescription("This will be option 3 in poll."))
        .addStringOption(option =>
            option
                .setName("option-4")
                .setDescription("This will be option 4 in poll.")),
    async execute(interaction) {
        var discordinput = ["title", "option-1", "option-2", "option-3", "option-4"]
        var embedtext = []

        for (var optionname of discordinput) {
            var discordinput = interaction.options.getString(optionname)
            embedtext.push(discordinput)
        }

        var pollembed = new EmbedBuilder()
        .setColor(config.Color)
        .setTitle(`${embedtext[0]}`)
        if (embedtext[4]) {
            pollembed.setDescription(`1: ${embedtext[1]}\n2: ${embedtext[2]}\n3: ${embedtext[3]}\n4: ${embedtext[4]}`)
        }
        else if (embedtext[3]) {
            pollembed.setDescription(`1: ${embedtext[1]}\n2: ${embedtext[2]}\n3: ${embedtext[3]}`)
        }
        else {
            pollembed.setDescription(`1: ${embedtext[1]}\n2: ${embedtext[2]}`)
        }

        interaction.reply({ embeds: [pollembed] })
        var messagereact = await interaction.fetchReply();
        messagereact.react("1️⃣");
        messagereact.react("2️⃣");
        if (embedtext[4]) {
            messagereact.react("3️⃣");
            messagereact.react("4️⃣");
        }
        else if (embedtext[3]) {
            messagereact.react("3️⃣");
        }
    }
}