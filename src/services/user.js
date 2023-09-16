const User = require('../models/User');

exports.createUser = async (data) => {
    try {
        const { userId, guildId, username, tag, avatar, guildName, guildIcon } = data;
        const user = await User.findOne({ userId, guildId });
        if (user) {
            user.username = username;
            user.tag = tag;
            user.avatar = avatar;
            user.guildName = guildName;
            user.guildIcon = guildIcon;
            return await user.save();
        }
        await User.create({
            userId,
            guildId,
            username,
            tag,
            avatar,
            guildName,
            guildIcon
        });
    } catch (err) {
        console.log(err);
    }
}

exports.addGoals = async (data) => {
    try {
        const { userId, guildId, goals } = data;
        const user = await User.findOne({ userId, guildId });
        if (!user) return;
        user.preferences.goals = goals;
        await user.save();
    } catch (err) {
        console.log(err);
    }
}

exports.addFrequency = async (data) => {
    try {
        const { userId, guildId, frequency } = data;

        const user = await User.findOne({ userId, guildId });
        if (!user) return;
        user.preferences.frequency = frequency;
        await user.save();
    } catch (err) {
        console.log(err);
    }
}


exports.getPreferences = async (data) => {
    try {
        const { userId, guildId } = data;

        const user = await User.findOne({ userId, guildId });
        if (!user) return;
        return user.preferences;
    } catch (err) {
        console.log(err);
    }
}

exports.start = async (data) => {
    try {
        const { userId, guildId } = data;

        const user = await User.findOne({ userId, guildId });
        if (!user) return;
        user.preferences.start = true;
        user.preferences.startedAt = new Date();
        await user.save();
    } catch (err) {
        console.log(err);
    }
}

exports.stop = async (data) => {
    try {
        const { userId, guildId } = data;

        const user = await User.findOne({ userId, guildId });
        if (!user) return;
        user.preferences.start = false;
        user.timeStamps.push({
            startTime: user.preferences.startedAt,
            endTime: Date.now(),
        });
        user.preferences.startedAt = null;
        await user.save();
        return user.preferences.startedAt;
    } catch (err) {
        console.log(err);
    }
}


exports.addActivity = async (data) => {
    try {
        const { userId, guildId, activityId } = data;
        
        const user = await User.findOne({ userId, guildId });

        if (!user) return;

        user.activityHistory.push({
            activity: activityId,
        });

        await user.save();

    } catch (err) {
        console.log(err);
    }
}