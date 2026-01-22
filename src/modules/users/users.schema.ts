import { VALIDATE_MESSAGE } from '@/libs/messages/validate';
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, VALIDATE_MESSAGE.REQUIRED),
  email: z
    .email(VALIDATE_MESSAGE.INVALID_EMAIL)
    .min(1, VALIDATE_MESSAGE.REQUIRED),
  role: z.string().min(1, VALIDATE_MESSAGE.REQUIRED),
  id: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;
