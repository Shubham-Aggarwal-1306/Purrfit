const { createUser } = require("../../services/user");
const menuMessage = require("../../messages/menuMessage");
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "menu",
    description: "This provides all the commands available to the user!",
    // devOnly: true,
    // testOnly: true,
    // ownerOnly: true,
    // options: Object [],
    // deleted: false,
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply({ephemeral: true});
        await createUser({ userId: interaction.user.id, guildId: interaction.guild.id, username: interaction.user.username, tag: interaction.user.discriminator, avatar: interaction.user.avatarURL(), guildName: interaction.guild.name, guildIcon: interaction.guild.iconURL() });
        await interaction.editReply({
            embeds: [menuMessage]
        });
    }
}