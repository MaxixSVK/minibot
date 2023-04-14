const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("art")
        .setDescription("Ai will generete you a image.")
        .addStringOption(option =>
            option
                .setName("prompt")
                .setDescription("What should be on image.")
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

        const ask = interaction.options.getString("prompt"); 
        const response = await openai.createImage({
            prompt: `${ask}`,
            n: 1,
            size: "1024x1024",
        });
        
        await interaction.editReply(response.data.data[0].url);
    }
}