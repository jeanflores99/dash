import React from 'react';
import { SelectRemote } from '@common/select/select-remote';
import { getTypeLicenses } from '../apis';
import { ITypeLicenseEntity } from '../dtos/type-license.entity';

interface IProps { 
  // eslint-disable-next-line no-unused-vars
  onChange: (option: any) => void
  value: number | string
  name: string,
  defaultQuerySearch?: string
}

export const TypeLicenseSelect = ({ name, value, onChange, defaultQuerySearch }: IProps) => {

  return (
    <SelectRemote
      defaultQuerySearch={defaultQuerySearch}
      handle={getTypeLicenses}
      name={name}
      value={value}
      onChange={onChange}
      selectRow={{ 
        label: (row: ITypeLicenseEntity) => `${row.name}`.toLowerCase(),
        value: (row) => row.id
      }}
    />
  )
}