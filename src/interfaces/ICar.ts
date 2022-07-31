import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = z.object({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

const mergedSchema = carZodSchema.merge(vehicleZodSchema);

export type ICar = z.infer<typeof mergedSchema>;
export { mergedSchema };
