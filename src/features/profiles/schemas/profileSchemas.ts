import {z} from 'zod';
import {PROFILE_NAME_MAX_LENGTH} from '@constants/limits';

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Profile name is required')
    .max(PROFILE_NAME_MAX_LENGTH, `Max ${PROFILE_NAME_MAX_LENGTH} characters`),
  icon: z.string().min(1, 'Pick an icon'),
  color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, 'Pick a color'),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
