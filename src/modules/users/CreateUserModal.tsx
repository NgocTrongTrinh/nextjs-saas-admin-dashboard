'use client';

import { Modal } from 'antd';
import UserForm from './UserForm';
import { UserFormValues } from './users.schema';
import { useCreateUser, useUpdateUser } from '@/hooks/user/useUserMutation';

type Props = {
  open: boolean;
  onClose: () => void;
  isEditing?: boolean;
  initialValues?: UserFormValues;
};

export default function CreateEditUserModal({
  open,
  onClose,
  isEditing = false,
  initialValues,
}: Props) {
  const userId = initialValues?.id;
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser(userId as string);

  const handleSubmit = (values: UserFormValues) => {
    const { id, ...payload } = values;

    const mutation = isEditing
      ? updateMutation.mutate({ id, ...payload }, { onSuccess: onClose })
      : createMutation.mutate(payload, { onSuccess: onClose });

    return mutation;
  };

  return (
    <Modal
      title={!isEditing ? 'Create User' : 'Edit User'}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
    >
      <UserForm
        onSubmit={handleSubmit}
        onCloseModal={onClose}
        initialValues={initialValues}
      />
    </Modal>
  );
}
