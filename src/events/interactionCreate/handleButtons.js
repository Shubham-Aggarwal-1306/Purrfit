const { addActivity } = require("../../services/user");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    try {
        const action = interaction.customId.split('-')[0];
        if (action === 'no') return interaction.reply({ content: 'Oh! That\'s sad!', ephemeral: true });
        if (action === 'activity') {
            const activityId = interaction.customId.split('-')[1];
             
            await addActivity({
                userId: interaction.user.id,
                guildId: interaction.guild.id,
                activityId,
            });

            interaction.reply({ content: 'Activity added!', ephemeral: true });
        }
    } catch (error) {
        console.error(error);
    }
}
