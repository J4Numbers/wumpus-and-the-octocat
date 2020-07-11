import config from "config";
import {DiscordBot} from "./discord-bot";

let discordBot: DiscordBot;

export function resolveDiscordBot(): DiscordBot {
    if (discordBot === undefined) {
        discordBot = new DiscordBot(
            config.get("discord.token"),
            config.get("discord.registered_channels"),
        );
    }
    return discordBot;
}
