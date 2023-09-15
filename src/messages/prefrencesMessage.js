const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const goals = require('../data/goals');
const frequencies = require('../data/frequencies');





const preferencesEmbed = new EmbedBuilder()
    .setThumbnail('https://res.cloudinary.com/dn2jk5smj/image/upload/v1694522904/purrfit/preferecesIcon_rnw95u.png')
    .setFields(
        {
            name: '🎯 Setting Goals and Reminders',
            value: `"Meow! Pick your goals like sitting right, drinking water, or resting your eyes, then choose how often, and we'll help you game comfy and happy!" 🐱`
        },
        {
            name: `🐱 To set reminders, follow these steps using the drop down menus below:`,
            value: `
            1. Select any focus areas from the drop down menu below. (You can select as many as you want!)

            2. Select the frequency for the reminders from the drop down menu below.`
        },
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