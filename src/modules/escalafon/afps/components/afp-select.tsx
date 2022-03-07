import React from 'react';
import { SelectRemote } from '@common/select/select-remote';
import { getAfps } from '../apis';
import { AfpEntity } from '../dtos/afp.entity';

interface IProps { 
  // eslint-disable-next-line no-unused-vars
  onChange: (option: any) => void
  value: number | string
  name: string
}

export const AfpSelect = ({ name, value, onChange }: IProps) => {

  return (
    <SelectRemote
      handle={getAfps}
      name={name}
      value={value}
      onChange={onChange}
      selectRow={{ 
        label: (row: AfpEntity) => (
          `${row.name} ${row.isPrivate ? `- ${row.typeAfp}` : ''}`.toLowerCase()
        ),
        value: (row) => row.id
      }}
    />
  )
}