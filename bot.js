const config = require('config');

const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function _init() {
    client.login(config.get('discord.token'));
}

function ping(payload) {
    return "Ping request from repository"
}

function push(payload) {
    var details;
    if (payload.base_ref == null) {
        details = `New push event on branch '${payload.ref}' with commits:\n`;
    } else {
        details = `New merge event from branch '${payload.base_ref}' `
            + `onto branch '${payload.ref}' with fast-forwarded commits:\n`;
    }
    for (var i in payload.commits) {
        details += `\t${payload.commits[i].timestamp} :: `
            + `${payload.commits[i].author["username"]} :: `
            + `${payload.commits[i].message}\n`;
    }
    return details;
}

function create(payload) {
    return `New branch ${payload.ref} created by ${payload.sender.login}\n`
}

function _event(eventType, jsonData) {
    let message = `Event on repository: ${jsonData.repository.html_url}\n` +
              `Updated at ${jsonData.repository.updated_at} by user ${jsonData.sender.login}`;
    let details;

    switch (eventType){
        case "ping": {
            details = ping(jsonData);
            break;
        }
        case "push": {
            details = push(jsonData);
            break;
        }
        case "create": {
            details = create(jsonData);
            break;
        }
        default: {
            details = ""
        }
    }

    config.get('discord.registered_channels').forEach((channelId) => {
        client.channels.find((channel) => channel.id === channelId).send(message + "\n\n" + details);
    });
}


module.exports = {
    init: _init,
    event: _event,
};
