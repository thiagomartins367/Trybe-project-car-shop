import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = z.object({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

export type ICar = z.infer<typeof vehicleZodSchema & typeof carZodSchema >;
export { carZodSchema };
