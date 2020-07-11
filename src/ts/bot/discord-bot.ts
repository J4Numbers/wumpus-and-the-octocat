import Logger from "bunyan";
import {Channel, Client, Message, PartialTextBasedChannelFields} from "discord.js";
import GitHubFormatters from "../github/formatters";
import Webhooks from "@octokit/webhooks";

const logger: Logger = require('../../lib/logger').bunyanLogger();

export class DiscordBot {
    client: Client;
    channelList: Array<string>;

    constructor(loginToken: string, registeredChannels: Array<string>) {
        this.client = new Client();
        this.channelList = registeredChannels;
        this.client.login(loginToken);
        this.client.on('ready', () => {
            logger.info(`Logged in as ${this.client.user.tag}!`);
        });
    }

    private sendMessageToChannels(message: string): Array<Promise<Message|{}>> {
        return this.channelList.map((channelId) => {
            const channelToSendTo: Channel = this.client.channels.find((channel: Channel) => channel.id === channelId);
            if (channelToSendTo.type === 'text') {
                return (channelToSendTo as Channel & PartialTextBasedChannelFields).send(message);
            } else {
                return Promise.resolve({});
            }
        });
    }

    async event(eventType: string, eventPayload: Webhooks.WebhookPayloadMeta): Promise<void> {
        logger.info(`Received ${eventType} request from ${eventPayload.repository.html_url}`);

        let message = `Event on repository: ${eventPayload.repository.html_url}\n` +
            `Updated at ${eventPayload.repository.updated_at} by user ${eventPayload.sender.login}`;
        let details: string;

        switch (eventType){
            case "ping": {
                details = GitHubFormatters.ping(eventPayload as unknown as Webhooks.WebhookPayloadPing);
                break;
            }
            case "push": {
                details = GitHubFormatters.push(eventPayload as unknown as Webhooks.WebhookPayloadPush);
                break;
            }
            case "create": {
                details = GitHubFormatters.create(eventPayload as unknown as Webhooks.WebhookPayloadCreate);
                break;
            }
            default: {
                details = ""
            }
        }

        const sendPromises: (Promise<Message> | Promise<{}>)[] = this.sendMessageToChannels(`${message}\n\n${details}`);

        try {
            await Promise.all(sendPromises)
        } catch (e) {
            logger.info(`Error thrown when sending: ${e.message}`);
            throw e;
        }
    }
}
