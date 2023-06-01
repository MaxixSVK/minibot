const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask-ai")
    .setDescription("Ask a question, AI will reply.")
    .addStringOption(option =>
      option
        .setName("question")
        .setDescription("Your question for AI.")
        .setRequired(true)),
  async execute(interaction) {
    const ask = interaction.options.getString("question");

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I am a friendly discord bot "mini bot" answearing questions (only chat). Question: ${ask}`,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,    
    });
    
    interaction.reply(response.data.choices[0].text)
  }
}