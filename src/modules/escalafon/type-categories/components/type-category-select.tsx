import React from 'react';
import { SelectRemote } from '@common/select/select-remote';
import { getTypeCategories } from '../apis';
import { ITypeCategoryEntity } from '../dtos/type-category.entity';

interface IProps { 
  // eslint-disable-next-line no-unused-vars
  onChange: (option: any) => void
  value: number | string
  name: string,
  defaultQuerySearch?: string
}

export const TypeCategorySelect = ({ name, value, onChange, defaultQuerySearch }: IProps) => {

  return (
    <SelectRemote
      defaultQuerySearch={defaultQuerySearch}
      handle={getTypeCategories}
      name={name}
      value={value}
      onChange={onChange}
      selectRow={{ 
        label: (row: ITypeCategoryEntity) => `${row.name}`.toLowerCase(),
        value: (row) => row.id
      }}
    />
  )
}