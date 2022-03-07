import React from 'react';
import { SelectRemote } from '@common/select/select-remote';
import { getProfiles } from '../apis';
import { IProfileEntity } from '../dtos/profile.entity';

interface IProps { 
  // eslint-disable-next-line no-unused-vars
  onChange: (option: any) => void
  value: number | string
  name: string
}

export const ProfileSelect = ({ name, value, onChange }: IProps) => {

  return (
    <SelectRemote
      handle={getProfiles}
      name={name}
      value={value}
      onChange={onChange}
      selectRow={{ 
        label: (row: IProfileEntity) => `${row.name}`.toLowerCase(),
        value: (row) => row.id
      }}
    />
  )
}