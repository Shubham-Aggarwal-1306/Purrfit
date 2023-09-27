const badges = require("../../data/badges");
const profileMessage = require("../../messages/profileMessage");
const { createUser, getUser, getActivityCountByGoal } = require("../../services/user");
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "profile",
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
        const user = await getUser({ userId: interaction.user.id, guildId: interaction.guild.id });
        const history = user.activityHistory || [];
        const preferences = user.preferences || {};
        const noOfActivitiesByGoals = await getActivityCountByGoal({ userId: interaction.user.id, guildId: interaction.guild.id });
        // find the badge with the highest number of activities
        let badge = badges[0];
        for (const element of badges) {
            if (element.activites <= history.length) {
                badge = element;
            }
        }

        const embed = await profileMessage(user.username, badge, preferences, noOfActivitiesByGoals);


        await interaction.editReply({embeds: [embed]});
    }
}

