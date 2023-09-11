const {Client, GuildMember} = require('discord.js');
const { createUser } = require('../../services/user');
const menuMessage = require('../../utils/menuMessage');

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, member) => {
    try {
        let guild = member.guild;
        if (!guild) return;

        await createUser({ userId: member.id, guildId: guild.id });

        const dmChannel = await member.createDM();

        await dmChannel.send({
            embeds: [menuMessage]
        });
    } catch (err) {
        console.error("Error with auto role event: ", err);
    }
}