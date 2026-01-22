export const PERMISSIONS = {
  USER_CREATE: 'user:create',
  USER_EDIT: 'user:edit',
  USER_VIEW: 'user:view',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
