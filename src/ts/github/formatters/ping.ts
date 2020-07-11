import Webhooks from "@octokit/webhooks";

export function format(payload: Webhooks.WebhookPayloadPing): string {
    return "Ping request from repository"
}
