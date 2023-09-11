const User = require('../models/User');

exports.createUser = async (data) => {
    try {
        const { userId, guildId } = data;
        const user = await User.findOne({ userId, guildId });
        if (user) return;
        await User.create({
            userId,
            guildId,
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
        user.preferences.startedAt = Date.now();
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
        await user.save();
        return user.preferences.startedAt;
    } catch (err) {
        console.log(err);
    }
}
