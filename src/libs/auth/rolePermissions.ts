import { Role } from './roles';
import { Permission, PERMISSIONS } from './permissions';

export const rolePermissions: Record<Role, readonly Permission[]> = {
  admin: [
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_EDIT,
    PERMISSIONS.USER_VIEW,
  ],
  manager: [PERMISSIONS.USER_EDIT, PERMISSIONS.USER_VIEW],
  staff: [PERMISSIONS.USER_VIEW],
};
