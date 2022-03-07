import React from 'react';
import { SelectRemote } from '@common/select/select-remote';
import { getBadges } from '../apis';
import { IBadgeEntity } from '../dtos/badge.entity';

interface IProps { 
  // eslint-disable-next-line no-unused-vars
  onChange?: (option: any) => void
  value: number | string
  name: string,
  defaultQuerySearch?: string
}

export const BadgeSelect = ({ name, value, defaultQuerySearch, onChange }: IProps) => {
  return (
    <SelectRemote
      defaultQuerySearch={defaultQuerySearch}
      handle={getBadges}
      name={name}
      value={value}
      onChange={onChange}
      selectRow={{ 
        label: (row: IBadgeEntity) => (
          `${row.departament} / ${row.province} / ${row.district}`.toLowerCase()
        ),
        value: (row: IBadgeEntity) => row.codUbi
      }}
    />
  )
}