/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Checkbox, Select, SelectProps } from 'antd';
import { ReactNode, useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import BaseLabel from '../BaseLabel';
import { cn } from '@/utils/common';
import { TOAST_MESSAGES } from '@/libs/messages/toast';
import BaseError from '../BaseError';

type Props = {
  label?: string;
  isRequired?: boolean;
  className?: string;
  control: Control<any>;
  errors?: string;
  name: string;
  defaultValue?: string | string[];
  isShowSearch?: boolean;
  withCheckbox?: boolean;
  wrapClassName?: string;
  notFoundClassName?: string;
  onChangeEffect?: (e: any) => void;
} & SelectProps;

function BaseSelect({
  label,
  isRequired = false,
  className,
  control,
  errors,
  name,
  defaultValue,
  isShowSearch = true,
  withCheckbox = false,
  onChangeEffect,
  wrapClassName,
  notFoundClassName,
  ...rest
}: Props) {
  const filterOption = (input: string, option?: any) => {
    return (
      (String(option?.label) ?? '')
        ?.toLowerCase()
        ?.includes(String(input)?.toLowerCase()) ||
      (String(option?.children) ?? '')
        ?.toLowerCase()
        ?.includes(String(input)?.toLowerCase())
    );
  };

  const isMultipleWithCheckbox = useMemo(() => {
    return withCheckbox && rest.mode === 'multiple';
  }, [withCheckbox, rest.mode]);

  // Custom option render for checkbox
  const renderOption = (option: any, isSelected: boolean): ReactNode => {
    if (isMultipleWithCheckbox) {
      return (
        <div className="flex items-center gap-2 py-1">
          <Checkbox checked={isSelected} />
          <span>{option.label || option.children}</span>
        </div>
      );
    }
    return option.label || option.children;
  };

  return (
    <div className={wrapClassName}>
      {label && <BaseLabel label={label} isRequired={isRequired} />}
      <Controller
        name={name as string}
        control={control!}
        defaultValue={defaultValue}
        render={({ field, formState: { errors: errorsField } }) => (
          <>
            <Select
              notFoundContent={
                <p className={notFoundClassName}>{TOAST_MESSAGES.NO_DATA}</p>
              }
              className={cn(
                'select-common w-full h-12 [&_.ant-select-selection-wrap]:h-full text-neutral-10',
                isMultipleWithCheckbox && '[&_.ant-select-dropdown]:p-0',
                className,
              )}
              popupClassName="select-common-dropdown"
              status={(errors || errorsField[name]?.message) && 'error'}
              {...field}
              {...rest}
              onChange={
                onChangeEffect
                  ? (e) => {
                      field.onChange(e);
                      onChangeEffect(e);
                    }
                  : field.onChange
              }
              showSearch={isShowSearch}
              filterOption={filterOption}
              optionRender={
                isMultipleWithCheckbox
                  ? (option) => {
                      const selectedValues = Array.isArray(field.value)
                        ? field.value
                        : [];
                      const isSelected = selectedValues.includes(option.value);
                      return renderOption(option, isSelected);
                    }
                  : undefined
              }
              maxTagCount="responsive"
              tagRender={
                isMultipleWithCheckbox
                  ? (props) => (
                      <span className="flex items-center gap-1 px-2 py-1 bg-blue-100  rounded text-sm mr-1">
                        {props.label}
                        {props.closable && (
                          <button
                            className="hover:bg-blue-200 rounded p-0.5"
                            onClick={props.onClose}
                          >
                            ×
                          </button>
                        )}
                      </span>
                    )
                  : undefined
              }
              menuItemSelectedIcon={null}
            />
            <BaseError errors={errors || errorsField[name]?.message} />
          </>
        )}
      />
    </div>
  );
}

export default BaseSelect;
