import { z } from 'zod';

const idDocumentZodSchema = z.object({
  _id: z.string().optional(),
});

export type IidDocument = z.infer<typeof idDocumentZodSchema>;
export { idDocumentZodSchema };
