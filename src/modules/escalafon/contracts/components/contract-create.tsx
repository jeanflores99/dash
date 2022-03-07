/* eslint-disable no-unused-vars */
import { IInputHandle } from '@common/dtos/input-handle';
import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { ICreateContractDto } from '../dtos/create-contract.dto';
import { ContractForm } from './contract-form';
import { Save } from 'react-feather';
import { createContract } from '../apis';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { IContractEntity } from '../dtos/contract.entity';

interface IProps {
  isOpen: boolean,
  onClose: () => void
  onSave?: (contract: IContractEntity) => void
}

const dataDefault: ICreateContractDto = {
  workId: 0,
  typeCategoryId: 0,
  dependencyId: 0,
  profileId: 0,
  resolution: 'RS',
  dateOfResolution: '',
  dateOfAdmission: '',
  condition: 'CONTRATADO',
  ley: '',
  plaza: '',
  codeAIRHSP: '',
  hourhandId: 0,
  hours: 8
} 

export const ContractCreate = ({ isOpen, onClose, onSave }: IProps) => {

  const { work } = useSelector((state: RootState) => state.work);
  const [form, setForm] = useState<ICreateContractDto>(dataDefault);
  const [pending, setPending] = useState<boolean>(false);

  const handleForm = ({ name, value }: IInputHandle) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setPending(true)
    const payload: ICreateContractDto = Object.assign(form, {
      workId: work?.id || 0
    });
    // send create contract
    await createContract(payload)
      .then(data => {
        toast.success(`El contrato se guardó correctamente!`);
        setForm(dataDefault)
        if (typeof onSave == 'function') onSave(data);
      })
    .catch(() => toast.error(`No se pudo guardar los datos`))
    setPending(false)
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={onClose}>Nuevo Contrato</ModalHeader>
      <ModalBody>
        <ContractForm
          form={form}
          onChange={handleForm}
        />
        <div className='text-right'>
          <Button color='primary'
            disabled={pending}
            onClick={handleSave}
          > 
            <Save size={17}/>
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}