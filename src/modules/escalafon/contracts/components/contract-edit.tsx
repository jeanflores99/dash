/* eslint-disable no-unused-vars */
import { IInputHandle } from '@common/dtos/input-handle';
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { ICreateContractDto } from '../dtos/create-contract.dto';
import { ContractForm } from './contract-form';
import { Save, X } from 'react-feather';
import { createContract, editContract, findContract } from '../apis';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { IContractEntity } from '../dtos/contract.entity';
import { contractActions } from '../store';
import { Show } from '@common/show';

interface IProps {
  isOpen: boolean,
  onClose: () => void
}


export const ContractEdit = ({ isOpen, onClose }: IProps) => {

  const dispatch = useDispatch();
  const { contract } = useSelector((state: RootState) => state.contract);

  const dataDefault = {
    workId: contract?.workId || 0,
    typeCategoryId: contract?.typeCategoryId || 0,
    dependencyId: contract?.dependencyId || 0,
    profileId: contract?.profileId || 0,
    resolution: contract?.resolution || 'RS',
    dateOfResolution: contract?.dateOfResolution || '',
    dateOfAdmission: contract?.dateOfAdmission || '',
    terminationDate: contract?.terminationDate,
    condition: contract?.condition || 'CONTRATADO',
    ley: contract?.ley || '',
    plaza: contract?.plaza || '',
    codeAIRHSP: contract?.codeAIRHSP || '',
    hourhandId: contract?.hourhandId || 0,
    observation: contract?.observation || '',
    hours: contract?.hours || 8,
  };

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form, setForm] = useState<ICreateContractDto>(dataDefault);
  const [pending, setPending] = useState<boolean>(false);

  const handleForm = ({ name, value }: IInputHandle) => {
    setIsEdit(true);
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setPending(true)
    toast.dismiss();
    // send create contract
    await editContract(contract?.id || 0, form)
      .then(async data => {
        toast.success(`los datos se guardarón correctamente!`);
        await findContract(data.id)
          .then(cont => {
            dispatch(contractActions.find(cont))
            setIsEdit(false);
          })
        .catch(() => toast.warning(`actualiza la página para ver los cambios`))
      })
    .catch(() => toast.error(`No se pudo guardar los datos`))
    setPending(false)
  }

  useEffect(() => {
    if (!isEdit) setForm(dataDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, contract]);

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={onClose}>Editar Contrato</ModalHeader>
      <ModalBody>
        <ContractForm
          isEdit={true}
          form={form}
          onChange={handleForm}
        />
        <Show condition={isEdit}>
          <div className='text-right'>
            <Button color='danger'
              disabled={pending}
              onClick={() => setIsEdit(false)}
            > 
              <X className='icon'/>
            </Button>

            <Button color='primary'
              className='ml-2'
              disabled={pending}
              onClick={handleSave}
            > 
              <Save className='icon'/>
            </Button>
          </div>
        </Show>
      </ModalBody>
    </Modal>
  )
}