const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const goals = require('../data/goals');
const frequencies = require('../data/frequencies');





const preferencesEmbed = new EmbedBuilder()
    .setThumbnail('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2043&q=80')
    .setFields(
        {
            name: '🎯 Setting Goals and Reminders',
            value: `"Meow! Pick your goals like sitting right, drinking water, or resting your eyes, then choose how often, and we'll help you game comfy and happy!" 🐱`
        },
        {
            name: `🐱 Select the Health Area (If you choose multiple areas, you'll get a random notification)`,
            value: "`Posture` \t `Hydration` \t `Eye Breaks` \t `Stretching` \t `Movement`"
        },
        {
            name: `🐈 Select the Frequency (Only choose one)`,
            value: "`Every 30 minutes` \t `Every 60 minutes` \t `Every 90 minutes` \t `Every 120 minutes`"
        }
    )

const goalSelectMenu = new StringSelectMenuBuilder()
    .setCustomId('goalPreferences')
    .setPlaceholder('Select your health area')
    .addOptions(
        goals.map((goal) =>
            new StringSelectMenuOptionBuilder()
                .setLabel(goal.label)
                .setValue(goal.value)
                .setDescription(goal.description)
        )
    )
    .setMinValues(1)
    .setMaxValues(5)

const frequencySelectMenu = new StringSelectMenuBuilder()
    .setCustomId('frequencyPreferences')
    .setPlaceholder('Select your frequency')
    .addOptions(
        frequencies.map((frequency) =>
            new StringSelectMenuOptionBuilder()
                .setLabel(frequency.label)
                .setValue(frequency.value)
                .setDescription(frequency.description)
        )
    )
    .setMinValues(1)
    .setMaxValues(1)

const goalActionRow = new ActionRowBuilder()
    .addComponents(goalSelectMenu)

const frequencyActionRow = new ActionRowBuilder()
    .addComponents(frequencySelectMenu)

const preferencesMessage = {
    embeds: [preferencesEmbed],
    components: [goalActionRow, frequencyActionRow],
    ephemeral: true
}

module.exports = preferencesMessage;