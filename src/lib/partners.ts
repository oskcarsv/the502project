/** Inbox that qualifies partnership leads in private conversation. */
export const PARTNERS_EMAIL = "hello@the502project.com";

/**
 * Builds the prefilled application mailto. `email_body` is stored
 * already percent-encoded in the messages files, so only the subject
 * is encoded here to avoid double-encoding the body.
 */
export function partnersMailto(subject: string, body: string) {
  return `mailto:${PARTNERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
}
