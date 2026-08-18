import {z} from 'zod';
import {ZONE_RADIUS} from '@config/maps';
import {ZONE_NAME_MAX_LENGTH} from '@constants/limits';

export const zoneFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Zone name is required')
    .max(ZONE_NAME_MAX_LENGTH, `Max ${ZONE_NAME_MAX_LENGTH} characters`),
  latitude: z.number(),
  longitude: z.number(),
  radius: z
    .number()
    .min(ZONE_RADIUS.min, `Min ${ZONE_RADIUS.min}m`)
    .max(ZONE_RADIUS.max, `Max ${ZONE_RADIUS.max}m`),
  soundModeOnEntry: z.enum(['silent', 'vibrate', 'normal']),
  soundModeOnExit: z.enum(['restore', 'normal', 'vibrate']),
  profileId: z.string().min(1, 'Select a profile'),
  isActive: z.boolean(),
});

export type ZoneFormValues = z.infer<typeof zoneFormSchema>;
