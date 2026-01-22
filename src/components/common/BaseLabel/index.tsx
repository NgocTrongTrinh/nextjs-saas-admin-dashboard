import { cn } from '@/utils/common';
import { ReactNode } from 'react';

type BaseLabelProps = {
  label: string | ReactNode;
  isRequired?: boolean;
  className?: string;
};

function BaseLabel({ label, isRequired = false, className }: BaseLabelProps) {
  return (
    <div className="mb-2">
      <div className={cn('text-neutralCustom text-sm', className)}>
        <span className="mr-1 font-normal">{label}</span>
        {isRequired && (
          <span className="text-[13px] py-1 bg-error-foreground text-red-600 rounded-md inline font-medium">
            *
          </span>
        )}
      </div>
    </div>
  );
}

export default BaseLabel;
