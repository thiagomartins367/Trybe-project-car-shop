import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const motorcycleZodSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().lte(2500),
});

const mergedSchema = motorcycleZodSchema.merge(vehicleZodSchema);

export type IMotorcycle = z.infer<typeof mergedSchema>;
export { mergedSchema };
