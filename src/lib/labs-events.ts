export type LabsEvent = {
  slug: string;
  recurrenteUrl: string;
  whatsappUrl: string;
  /** Percentage 0–100 of seats still available. Update manually. */
  availablePercent: number;
};

export const LABS_EVENTS = {
  "ai-build-1": {
    slug: "ai-build-1",
    recurrenteUrl: "https://app.recurrente.com/s/the-502-project/ai-build-lab-1",
    whatsappUrl: "https://wa.me/50230059646",
    availablePercent: 60,
  },
} satisfies Record<string, LabsEvent>;

export type LabsEventSlug = keyof typeof LABS_EVENTS;

export function getLabsEvent(slug: string): LabsEvent | null {
  if (slug in LABS_EVENTS) {
    return LABS_EVENTS[slug as LabsEventSlug];
  }
  return null;
}
