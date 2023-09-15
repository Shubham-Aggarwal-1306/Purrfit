const { EmbedBuilder } = require('discord.js');

const menuMessage = new EmbedBuilder()
    .setThumbnail('https://res.cloudinary.com/dn2jk5smj/image/upload/v1694522904/purrfit/menuIcon_znqeyf.png')
    .addFields(
        {
            name: 'Meow! Getting Started with Purrfit',
            value: 'Hey there! I\'m Purrfit, the purr-fect pal for gamers who care about their health. I\'ll nudge you kindly, keep track of your activities, and help you juggle fun and fitness. Pawsome, right?'
        },
        {
            name: 'How to Begin',
            value: `
            1. Meow! Just type **/preferences** to pick your health areas and how often you want reminders during playtime. Once your goals are set, you can view them by typing **/goal**.\n2. Start your game with **/start**, end with **/end**, and take a break with **/pause**.\n3. Peek at your progress with **/profile @yourname** to view your goals, ranking, and your activity history. Purrfect! 🐾
            `
        },
        {
            name: 'Other Helpful Commands',
            value: `
            - **/menu** - To learn how to get started, view commands, and set preferences.\n- **/commands** - To view all commands.\n- **/profile @username** - To view profile, including goals, ranks, and activity history.\n- **/mute** - Temporarily disables all notifications and messages.
            `
        }
    )

module.exports = menuMessage;