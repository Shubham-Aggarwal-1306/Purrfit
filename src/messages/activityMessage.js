const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const activityMessage = (title, activity, benifits, url, playtime, id) => {
    const embed = new EmbedBuilder()
    .setThumbnail(url)
    .setTitle(title)
    .addFields(
        {
            name: 'Activity',
            value: activity
        },
        {
            name: 'Benefits',
            value: benifits
        },
        {
            name: 'Playtime',
            value: `You played for ${playtime} minutes`
        }
    )
    const actionRow = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(`activity-${id}`)
            .setLabel('Yes')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId('no')
            .setLabel('No')
            .setStyle(ButtonStyle.Danger)
    )
    
 const message = {
    embeds: [embed],
    components: [actionRow],
    ephemeral: true
}
return message
}

module.exports = activityMessage;