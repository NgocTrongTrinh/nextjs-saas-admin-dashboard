import { UserFormValues } from './users.schema';
import { PERMISSIONS } from '@/libs/auth/permissions';

export type UserColumnConfig = {
  key: string;
  title: string;
  dataIndex?: keyof UserFormValues;
  width?: number;
  sortable?: boolean;
  permission?: string;
  render?: (value: any, record: UserFormValues) => React.ReactNode;
};

export const USER_COLUMNS: UserColumnConfig[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
  },
  {
    key: 'action',
    title: 'Action',
    permission: PERMISSIONS.USER_EDIT,
  },
];
