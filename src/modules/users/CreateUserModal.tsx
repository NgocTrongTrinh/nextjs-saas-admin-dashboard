'use client';

import { Modal } from 'antd';
import UserForm from './UserForm';
import { UserFormValues } from './users.schema';

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
  const handleSubmit = (values: UserFormValues) => {
    console.log('Create user:', values);
    onClose();
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
