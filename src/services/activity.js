const Activity = require('../models/Activity');

exports.getActivitiesByGoal = async (goals) => {
    try {
        const activities = await Activity.find({ goal: { $in: goals } });
        return activities;
    } catch (err) {
        console.log(err);
    }
}