import React from 'react';
import { SelectRemote } from '@common/select/select-remote';
import { getHourhands } from '../apis';
import {IHourhandEntity } from '../dtos/hourhand.entity';

interface IProps { 
  // eslint-disable-next-line no-unused-vars
  onChange: (option: any) => void
  value: number | string
  name: string
}

export const HourhandSelect = ({ name, value, onChange }: IProps) => {

  return (
    <SelectRemote
      handle={getHourhands}
      name={name}
      value={value}
      onChange={onChange}
      selectRow={{ 
        label: (row: IHourhandEntity) => `${row.name}`.toLowerCase(),
        value: (row) => row.id
      }}
    />
  )
}