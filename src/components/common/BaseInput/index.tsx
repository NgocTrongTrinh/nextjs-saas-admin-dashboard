/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Input, InputProps, InputRef } from 'antd';
import React, { ReactNode } from 'react';
import { Controller, Control, ControllerRenderProps } from 'react-hook-form';
import { trim } from 'lodash';

import { cn } from '@/utils/common';
import BaseLabel from '../BaseLabel';
import BaseError from '../BaseError';

type Props = {
  label?: string;
  isRequired?: boolean;
  className?: string;
  labelClassName?: string;
  control: Control<any>;
  name: string;
  defaultValue?: string;
  wrapClassName?: string;
  suffixText?: string | ReactNode;
  maxLength?: number;
  error?: string;
  isShowMessageError?: boolean;
  inputRef?: React.Ref<InputRef>;
} & InputProps;

function BaseInput({
  label,
  isRequired = false,
  className,
  labelClassName,
  control,
  name,
  defaultValue,
  maxLength = 256,
  wrapClassName,
  suffixText,
  error,
  isShowMessageError = true,
  inputRef,
  ...rest
}: Props) {
  // Trim Field Input
  const handleMouseOut = (
    event: React.FocusEvent<HTMLInputElement, Element>,
    field: ControllerRenderProps<any, string>,
  ) => {
    if (!event.target.value) return;
    const trimmedValue = trim(event.target.value.trim(), '\n');
    return field.onChange(trimmedValue);
  };

  return (
    <div className={wrapClassName}>
      {label && (
        <BaseLabel
          className={labelClassName}
          label={label}
          isRequired={isRequired}
        />
      )}
      <Controller
        name={name as string}
        control={control}
        defaultValue={defaultValue}
        render={({ field, formState: { errors } }) => {
          const messageErr = error || errors[name]?.message;
          return (
            <>
              <div className="relative">
                <Input
                  maxLength={maxLength}
                  status={messageErr && 'error'}
                  className={cn('input-common input-common--md', className)}
                  {...field}
                  ref={inputRef || field.ref}
                  onBlur={(event) => handleMouseOut(event, field)}
                  {...rest}
                />
                {suffixText ? suffixText : ''}
              </div>
              {isShowMessageError && <BaseError errors={messageErr} />}
            </>
          );
        }}
      />
    </div>
  );
}

export default BaseInput;
