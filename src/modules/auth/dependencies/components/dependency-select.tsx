import React from 'react';
import { SelectRemote } from '@common/select/select-remote';
import { getDependencies } from '../apis';
import { IDependencyEntity } from '../dtos/dependency.entity';

interface IProps { 
  // eslint-disable-next-line no-unused-vars
  onChange: (option: any) => void
  value: number | string
  name: string
}

export const DependencySelect = ({ name, value, onChange }: IProps) => {

  return (
    <SelectRemote
      handle={getDependencies}
      name={name}
      value={value}
      onChange={onChange}
      selectRow={{ 
        label: (row: IDependencyEntity) => `${row.name}`.toLowerCase(),
        value: (row) => row.id
      }}
    />
  )
}