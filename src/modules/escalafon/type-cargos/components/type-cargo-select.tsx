import React from 'react';
import { SelectRemote } from '@common/select/select-remote';
import { getTypeCargos } from '../apis';
import { ITypeCargoEntity } from '../dtos/type-cargo.entity';

interface IProps { 
  // eslint-disable-next-line no-unused-vars
  onChange: (option: any) => void
  value: number | string
  name: string
}

export const TypeCargoSelect = ({ name, value, onChange }: IProps) => {

  return (
    <SelectRemote
      handle={getTypeCargos}
      name={name}
      value={value}
      onChange={onChange}
      selectRow={{ 
        label: (row: ITypeCargoEntity) => `${row.name}`.toLowerCase(),
        value: (row) => row.id
      }}
    />
  )
}