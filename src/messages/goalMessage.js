const { EmbedBuilder } = require('discord.js');

const goalMessage = (goals, frequency) => {
    const embed = new EmbedBuilder()
    .setThumbnail('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2043&q=80')
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