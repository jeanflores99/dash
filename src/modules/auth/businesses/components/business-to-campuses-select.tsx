import React from 'react';
import { SelectRemote } from '@common/select/select-remote';
import { findCampuses } from '../apis';
import { ICampusEntity } from '@modules/auth/campuses/dtos/campus.entity';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

interface IProps { 
  // eslint-disable-next-line no-unused-vars
  onChange: (option: any) => void
  value: number | string
  name: string
}

export const BusinessToCampusesSelect = ({ name, value, onChange }: IProps) => {

  const { client } = useSelector((state: RootState) => state.client);

  return (
    <SelectRemote
      url={`${client?.businessId}`}
      handle={findCampuses}
      name={name}
      value={value}
      onChange={onChange}
      selectRow={{ 
        label: (row: ICampusEntity) => `${row.name}`.toLowerCase(),
        value: (row) => row.id
      }}
    />
  )
}