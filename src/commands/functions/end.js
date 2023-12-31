const { createUser, stop, getPreferences } = require("../../services/user");
const menuMessage = require("../../messages/menuMessage");

module.exports = {
    name: "end",
    description: "This ends the notification flow!",
    // devOnly: true,
    // testOnly: true,
    // ownerOnly: true,
    // options: Object [],
    // deleted: false,

    callback: async (client, interaction) => {
        await interaction.deferReply({ephemeral: true});
        await createUser({ userId: interaction.user.id, guildId: interaction.guild.id, username: interaction.user.username, tag: interaction.user.discriminator, avatar: interaction.user.avatarURL(), guildName: interaction.guild.name, guildIcon: interaction.guild.iconURL() });
        const preferences = await getPreferences({ userId: interaction.user.id, guildId: interaction.guild.id });
        if (preferences.goals.length === 0) {
            await interaction.editReply({
                content: "You have not set any goals yet! Please set your goals first!",
            });
            return;
        }
        await stop({ userId: interaction.user.id, guildId: interaction.guild.id });
        await interaction.editReply({
            content: "You have ended the notification flow!",
        });
    }
}