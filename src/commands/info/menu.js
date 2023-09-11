const { createUser } = require("../../services/user");
const menuMessage = require("../../messages/menuMessage");

module.exports = {
    name: "menu",
    description: "This provides all the commands available to the user!",
    // devOnly: true,
    // testOnly: true,
    // ownerOnly: true,
    // options: Object [],
    // deleted: false,

    callback: async (client, interaction) => {
        await interaction.deferReply({ephemeral: true});
        await createUser({ userId: interaction.user.id, guildId: interaction.guild.id });
        await interaction.editReply({
            embeds: [menuMessage]
        });
    }
}