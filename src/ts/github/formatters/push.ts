import Webhooks from "@octokit/webhooks";

export function format(payload: Webhooks.WebhookPayloadPush): string {
    let details;
    if (payload.base_ref == null) {
        details = `New push event on branch '${payload.ref}' with commits:\n`;
    } else {
        details = `New merge event from branch '${payload.base_ref}' `
            + `onto branch '${payload.ref}' with fast-forwarded commits:\n`;
    }
    for (let i in payload.commits) {
        details += `\t${payload.commits[i].timestamp} :: `
            + `${payload.commits[i].author["username"]} :: `
            + `${payload.commits[i].message}\n`;
    }
    return details;
}
