import config from "config";
import {DiscordBot} from "./discord-bot";

let discordBot: DiscordBot;

export function resolveDiscordBot(): DiscordBot {
    if (discordBot === undefined) {
        let channels: Array<string> | string = config.get("discord.registered_channels");
        if (typeof channels === 'string') {
            channels = channels.split(',');
        }
        discordBot = new DiscordBot(
            config.get("discord.token"),
            channels,
        );
    }
    return discordBot;
}
