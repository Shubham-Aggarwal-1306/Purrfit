const { ComponentType, Client, Interaction } = require("discord.js");
const { createUser, getPreferences } = require("../../services/user");
const goals = require("../../data/goals");
const goalMessage = require("../../messages/goalMessage");

module.exports = {
    name: "goal",
    description: "This shows us our current goals and frequency!",
    // devOnly: true,
    // testOnly: true,
    // ownerOnly: true,
    // options: Object [],
    // deleted: false,
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply({ephemeral: true});
        await createUser({ userId: interaction.user.id, guildId: interaction.guild.id, username: interaction.user.username, tag: interaction.user.discriminator, avatar: interaction.user.avatarURL(), guildName: interaction.guild.name, guildIcon: interaction.guild.iconURL() });
        const preferences = await getPreferences({ userId: interaction.user.id, guildId: interaction.guild.id });
        let goalsDesc = [];
        let frequencyDesc = '';
        for (const goal of preferences.goals) {
            goalsDesc.push(goals.find((g) => g.value === goal)?.label);
        }
        frequencyDesc = preferences.frequency === 0 ? 'Frequency Not Set' : `Every ${preferences.frequency} minutes`;
        const embed = goalMessage( goalsDesc, frequencyDesc );
        await interaction.editReply({ embeds: [embed] });
    }
}