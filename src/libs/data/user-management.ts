import { UserRole } from '../enums/user-management';

export const UserRoleOptions = [
  {
    label: 'Admin',
    value: UserRole.ADMIN,
  },
  {
    label: 'Manager',
    value: UserRole.MANAGER,
  },
  {
    label: 'Staff',
    value: UserRole.STAFF,
  },
];

export const userDefaultValue = {
  name: '',
  email: '',
  role: '',
};
