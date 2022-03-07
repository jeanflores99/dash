import { RootState } from '@store/store';
import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'react-feather';
import { useSelector } from 'react-redux';
import { findContractFile } from '../apis';

const NotFile = () => <span>N/A</span>

export const ContractFile = () => {

  const { contract } = useSelector((state: RootState) => state.contract);
  const [file, setFile] = useState<any>({});

  const getFile = async () => {
    if (!contract?.fileId) return setFile({});
    // obtener archivo
    await findContractFile(contract?.id || 0)
      .then(data => setFile(data))
      .catch(() => setFile({}))
  }

  useEffect(() => {
    if (contract?.id) getFile()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  if (!file?.id) return <NotFile/>

  return (
    <a href={file?.url || '#'} target="_blank" rel="noreferrer">
      <ExternalLink className='icon'/> {file?.name}
   </a> 
  );
}