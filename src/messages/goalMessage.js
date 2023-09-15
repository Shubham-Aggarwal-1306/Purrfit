const { EmbedBuilder } = require('discord.js');

const goalMessage = (goals, frequency) => {
    const embed = new EmbedBuilder()
    .setThumbnail('https://res.cloudinary.com/dn2jk5smj/image/upload/v1694522903/purrfit/goalIcon_l7ctxc.png')
    .addFields(
        {
            name: '🎯 Review your Goals and Reminders (Type /preference to make changes)',
            value: `
            **Health Area**
            ${goals.length > 0 ?  goals.map((goal) => `- ${goal}`).join('\n') : 'No goals set'}
            \n
            **Frequency**
            - ${frequency}
            `
        },
        {
            name: '🎮 Start a gaming session',
            value: `Start your game with /start, end with /end, and take a break with /pause`
        },
    )
    return embed;
}

module.exports = goalMessage;