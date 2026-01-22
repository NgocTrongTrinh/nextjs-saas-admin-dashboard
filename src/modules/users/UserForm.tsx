'use client';

import { Button, Form } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UserFormValues, userSchema } from '@/modules/users/users.schema';
import { userDefaultValue, UserRoleOptions } from '@/libs/data/user-management';
import BaseInput from '@/components/common/BaseInput';
import BaseSelect from '@/components/common/BaseSelect';
import BaseConfirmModal from '@/components/common/BaseConfirmModal';
import { useEffect, useState } from 'react';

type Props = {
  onSubmit: (values: UserFormValues) => void;
  onCloseModal: () => void;
  loading?: boolean;
  initialValues?: UserFormValues;
};

export default function UserForm({
  onSubmit,
  loading,
  onCloseModal,
  initialValues = userDefaultValue,
}: Props) {
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    } else {
      reset(userDefaultValue);
    }
  }, [initialValues, reset]);

  const handleDiscard = () => {
    setOpenConfirmModal(false);
    onCloseModal();
    reset(initialValues);
  };

  const handleCancel = () => {
    if (isDirty) {
      setOpenConfirmModal(true);
    } else {
      onCloseModal();
    }
  };

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center gap-2 mb-4">
          <BaseInput control={control} name="name" label="Name" isRequired />

          <BaseInput control={control} name="email" label="Email" isRequired />

          <BaseSelect
            control={control}
            name="role"
            label="Role"
            options={UserRoleOptions}
            isRequired
          />
        </div>

        <div className="flex flex-row justify-center gap-2">
          <Button loading={loading} block onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Submit
          </Button>
        </div>
      </Form>
      <BaseConfirmModal
        open={openConfirmModal}
        onOk={handleDiscard}
        onCancel={() => setOpenConfirmModal(false)}
      />
    </>
  );
}
