import Webhooks from "@octokit/webhooks";

export function format(payload: Webhooks.WebhookPayloadPush): string {
    let details: string;
    if (payload.base_ref == null) {
        details = `New push event on branch '${payload.ref}' with commits:\n`;
    } else {
        details = `New merge event from branch '${payload.base_ref}' `
            + `onto branch '${payload.ref}' with fast-forwarded commits:\n`;
    }
    payload.commits.forEach((commit) => {
        details += `\t${commit.timestamp} :: ${commit.author.username} :: ${commit.message}\n`
    });
    return details;
}
