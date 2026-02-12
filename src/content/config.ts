import { defineCollection, z } from 'astro:content';

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEs: z.string().optional(),
    date: z.string(),
    time: z.string(),
    endTime: z.string().optional(),
    type: z.enum(['presencial', 'virtual', 'hybrid']),
    description: z.string(),
    descriptionEs: z.string().optional(),
    image: z.string().optional(),
    lumaUrl: z.string().optional(),
    customRegistrationUrl: z.string().optional(),
    status: z.enum(['open', 'waitlist', 'sold-out', 'requires-application', 'past']).default('open'),
    organizer: z.string().optional(),
    collaboration: z.boolean().default(false),
    collaboratorName: z.string().optional(),
    collaboratorLogo: z.string().optional(),
    collaboratorUrl: z.string().optional(),
    recordingUrl: z.string().optional(),
  }),
});

export const collections = { events };
