const { ComponentType } = require("discord.js");
const { createUser, addFrequency, addGoals } = require("../../services/user");
const preferencesMessage = require("../../messages/prefrencesMessage");

module.exports = {
    name: "preferences",
    description: "This starts the flow of preferences selection!",
    // devOnly: true,
    // testOnly: true,
    // ownerOnly: true,
    // options: Object [],
    // deleted: false,

    callback: async (client, interaction) => {
        await createUser({ userId: interaction.user.id, guildId: interaction.guild.id, username: interaction.user.username, tag: interaction.user.discriminator, avatar: interaction.user.avatarURL(), guildName: interaction.guild.name, guildIcon: interaction.guild.iconURL() });
        const reply = await interaction.reply(preferencesMessage);

        const goalCollector = reply.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            filter: (i) => i.user.id === interaction.user.id && i.customId === 'goalPreferences',
            time: 60_000
        });

        goalCollector.on('collect', async (i) => {
            if (i.values.length === 0) {
                await i.reply({ content: "You must select at least one goal!", ephemeral: true });
                return;
            }
            await addGoals({ userId: interaction.user.id, guildId: interaction.guild.id, goals: i.values });
            await i.reply({ content: "Goals have has been recorded", ephemeral: true });
        });

        const frequencyCollector = reply.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            filter: (i) => i.user.id === interaction.user.id && i.customId === 'frequencyPreferences',
            time: 60_000
        });

        frequencyCollector.on('collect', async (i) => {
            if (i.values.length === 0) {
                await i.reply({ content: "You must select at least one frequency!", ephemeral: true });
                return;
            }
            await addFrequency({ userId: interaction.user.id, guildId: interaction.guild.id, frequency: i.values[0] });
            await i.reply({ content: "Frequency has been Recorded", ephemeral: true });
        });
    }
}