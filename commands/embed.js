const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("embed")
		.setDescription("Create embed with custom text.")
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addStringOption(option =>
			option
				.setName("title")
				.setDescription("This will be title of the embed.")
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName("content")
				.setDescription("This will be content of the embed.")
				.setRequired(true)),
	async execute(interaction) {
		const title = interaction.options.getString("title");
		const content = interaction.options.getString("content");

		const Embed = new EmbedBuilder()
			.setTitle(title)
			.setDescription(content)
			.setColor(config.Color)

		await interaction.reply({ embeds: [Embed] });
	},
};