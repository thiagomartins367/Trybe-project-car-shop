import { z } from 'zod';

const mongooseKeyZodSchema = z.object({
  __v: z.number().int().optional(),
});

export type ImongooseKey = z.infer<typeof mongooseKeyZodSchema>;
export { mongooseKeyZodSchema };
