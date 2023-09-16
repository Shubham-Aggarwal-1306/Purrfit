const { createUser, getPreferences, start } = require("../../services/user");
const { getActivitiesByGoal } = require("../../services/activity");
const activityMessage = require("../../messages/activityMessage");
const { Client, CommandInteraction, time } = require("discord.js");
module.exports = {
    name: "start",
    description: "This starts the notification flow!",
    // devOnly: true,
    // testOnly: true,
    // ownerOnly: true,
    // options: Object [],
    // deleted: false,
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @returns 
     */
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
        await start({ userId: interaction.user.id, guildId: interaction.guild.id });

        const activities = await getActivitiesByGoal(preferences.goals);

        await interaction.editReply({
            content: "You have started the notification flow!",
        });

        // After every 1 min send a activity to the user using the activityMessage randomly from the activities array
        setInterval(async () => {
            // Check if the user has stopped the notification flow
            const preferences = await getPreferences({ userId: interaction.user.id, guildId: interaction.guild.id });
            if (!preferences.start) {
                clearInterval();
                return;
            }
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            const playtime = new Date(new Date() - preferences.startedAt).toISOString().slice(11, 19);
            // Send the activity message to the user considering we have already sent a reply to the user
            const message = activityMessage(randomActivity.title, randomActivity.activity, randomActivity.benefits, playtime, randomActivity.id);
            await interaction.followUp(message);
        }, preferences.frequency * 1000 * 60);
        
    }
}