import { rolePermissions } from './rolePermissions';
import { Permission } from './permissions';
import { Role } from './roles';

export function hasPermission(role: Role, permission: Permission) {
  return rolePermissions[role]?.includes(permission);
}
