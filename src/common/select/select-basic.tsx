import React, { useMemo } from 'react';
import Select from '@atlaskit/select';

interface IProps {
  className?: string
  name: string 
  value: number | string
  options: { label: string, value: any, obj?: any }[]
  isLoading?: boolean
  placeholder?: string
  // eslint-disable-next-line no-unused-vars
  onChange: (option: any) => void
}

export const SelectBasic = ({
  isLoading, className, name, value,
  onChange, options, placeholder }: IProps) => {

  const objSelect = useMemo(() => {
    const option = options.find(d => d?.value == value);
    return option || undefined
  }, [value, options]);

  return (
    <div>
      <Select isLoading={isLoading}
        options={options}
        className={`${className || ''} capitalize cursor-pointer`}
        classNamePrefix="hero"
        placeholder={`${placeholder || "Seleccionar"}`}
        name={name}
        value={objSelect}
        onChange={(option: any) => onChange({ ...option, name })}
      />
    </div>
  )
}