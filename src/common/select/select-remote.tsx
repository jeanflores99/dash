/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import Select from '@atlaskit/select';
import { ResponsePaginateDto } from '@common/dtos/response-paginate.dto';

interface ISelectRemote {
  value: (row: any) => any 
  label: (row: any) => any
}

interface IProps {
  url?: string,
  defaultQuerySearch?: string
  handle: Function
  selectRow: ISelectRemote
  className?: string
  name: string 
  value: number | string
  placeholder?: string
  onChange?: (option: any) => void
  onInputChange?: (value: string) => void
}

export const SelectRemote = ({
  handle, selectRow, className, placeholder, defaultQuerySearch,
  url, name, value, onChange, onInputChange }: IProps) => {

  const [pending, setPending] = useState(false);
  const [datos, setDatos] = useState<any[]>([]);
  const [, setIsError] = useState<boolean>(false);
  const [querySearch, setQuerySearch] = useState<string>(defaultQuerySearch || '')

  const objSelect = useMemo(() => {
    const option = datos.find(d => d?.value == value);
    return option || { value: undefined, label: placeholder || 'Seleccionar' }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datos, value]);

  const handleSearch = (value: string) => {
    if (typeof onInputChange == 'function') onInputChange(value);
    setQuerySearch(value);
  }

  const getData = async () => {
    setPending(true)
    setIsError(true)
    const filter = { page: 1, querySearch, limit: 100 };
    const params = url ? [url, filter] : [filter];
    // execute
    await handle(...params)
      .then(({ items }: ResponsePaginateDto<any>) => {
        return setDatos(items.map((i: any) => {
          const label = selectRow.label(i);
          const value = selectRow.value(i);
          return { name, label, value, row: i }
        }));
      }).catch(() => setIsError(true))
    setPending(false)
  }

  useEffect(() => {
    if (!querySearch) getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (querySearch) getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querySearch]);

  return (
    <div>
      <Select isLoading={pending}
        options={datos}
        className={`${className || ''} capitalize cursor-pointer`}
        classNamePrefix="hero"
        placeholder={placeholder || 'seleccionar'}
        name={name}
        value={objSelect}
        onChange={(option: any) => typeof onChange == 'function' ? onChange(option) : ''}
        onInputChange={handleSearch}
      />
    </div>
  )
}