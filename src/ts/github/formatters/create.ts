import Webhooks from "@octokit/webhooks";

export function format(payload: Webhooks.WebhookPayloadCreate): string {
    return `New branch ${payload.ref} created by ${payload.sender.login}\n`
}
