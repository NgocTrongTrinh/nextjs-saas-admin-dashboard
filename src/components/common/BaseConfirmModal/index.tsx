'use client';

import { Button, Modal, ModalProps } from 'antd';

import { cn } from '@/utils/common';
import { AlertOutlined } from '@ant-design/icons';

type Props = {
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
} & ModalProps;

export default function BaseConfirmModal({
  open,
  onOk,
  onCancel,
  width = 420,
  className,
}: Props) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={width}
      className={cn('[&_.ant-modal-content]:p-0!', className)}
    >
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertOutlined className="text-red-500! text-5xl" />
        </div>
        <div className="text-xl font-bold mb-2">Are you sure about that?</div>

        <div className="mb-6 whitespace-pre-line">
          What you have done, cannot be undone bro
        </div>

        <div className="flex gap-3">
          <Button className="flex-1" onClick={onCancel}>
            Nah
          </Button>

          <Button type="primary" className="flex-1" onClick={onOk}>
            Yah I&apos;m sure bro
          </Button>
        </div>
      </div>
    </Modal>
  );
}
