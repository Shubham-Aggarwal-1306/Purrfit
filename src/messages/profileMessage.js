const { EmbedBuilder } = require('discord.js');
const goals = require('../data/goals');
const ChartJsImage = require('chartjs-to-image');

const profileMessage = async (username, badge, preferences, noOfActivitiesByGoals) => {
    let goalsDesc = noOfActivitiesByGoals.map((noOfActivities) => noOfActivities.goal);
    const colours = ['#FBF7F8', '#FFC3DD', '#DE5F95', '#ff2582', '#8a0f3c', '#5a0625'];

    const chartConfig =  {
        type: 'pie',
        data: {
            datasets: [{
                fill: true,
                spanGaps: false,
                lineTension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 3,
                pointStyle: 'circle',
                borderDash: [0, 0],
                barPercentage: 0.9,
                categoryPercentage: 0.8,
                data: noOfActivitiesByGoals.map((noOfActivities) => noOfActivities.count),
                label: 'Activities completed by focus area',
                borderColor: '#ffffff',
                backgroundColor: colours.slice(0, noOfActivitiesByGoals.length),
                borderWidth: 0,
                hidden: false,
            }],
            labels: goalsDesc,

        },
        options: {
            title: {
                display: true,
                position: 'bottom',
                fontSize: 25,
                fontFamily: 'mono',
                fontColor: '#FFFFFF',
                fontStyle: 'normal',
                padding: 30,
                lineHeight: 1.2,
                text: 'Activities completed by focus area',
            },
            legend: {
                display: true,
                position: 'right',
                align: 'start',
                fullWidth: true,
                reverse: false,
                labels: {
                    fontSize: 15,
                    fontFamily: 'sans-serif',
                    fontColor: '#FFFFFF',
                    fontStyle: 'normal',
                    padding: 20,
                },
            },
            plugins: {
                datalabels: {
                    display: false,
                },
            },
        },
    };
    let chartImage = new URL("https://quickchart.io/chart");
    chartImage.searchParams.append('c', JSON.stringify(chartConfig));
    chartImage.searchParams.append('type', 'png');
    chartImage.searchParams.append('width', 600);
    chartImage.searchParams.append('height', 500);
    console.log(chartImage.toString());
    const embed = new EmbedBuilder()
        .setThumbnail(badge.url)
        .setTitle(`🐱 ${username}'s Profile`)
        .setFields(
            {
                name: '🥇 Current Rank',
                value: "=> " + badge.name,
            },
            {
                name: '🎯 Goals and Reminders (Type /preference to make changes)',
                value:
                    `
            **Health Areas**
            ${goalsDesc.length === 0 ? 'No Goals Set' : goalsDesc.map((goal) => `🎯 ${goal}`).join('\n')}
            
            **Frequency**
            ${preferences.frequency === 0 ? 'Frequency Not Set' : `Every ${preferences.frequency} minutes`}
            `
            }
        )
        .setImage(chartImage.toString())

    return embed;
}

module.exports = profileMessage;