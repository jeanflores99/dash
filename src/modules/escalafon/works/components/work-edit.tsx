import { IInputHandle } from '@common/dtos/input-handle';
import { Show } from '@common/show';
import { RootState } from '@store/store';
import React, { useEffect, useMemo, useState } from 'react';
import { RefreshCcw, X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { editWork, findWork } from '../apis';
import { ICreateWorkDto } from '../dtos/create-work.dto';
import { workActions } from '../store';
import { WorkForm } from './work-form';

interface IProps {
  isOpen: boolean
  onClose: () => void
}

export const WorkEdit = ({ isOpen, onClose }: IProps) => {
  
  const dispatch = useDispatch();

  const { work } = useSelector((state: RootState) => state.work);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);

  const defaultData: ICreateWorkDto = useMemo(() => {
    return {
      personId: work?.personId || 0,
      afpId: work?.afpId || 0,
      affiliationOfDate: work?.affiliationOfDate,
      numberOfCussp: work?.numberOfCussp,
      isPrimaSeguro: work?.isPrimaSeguro || false,
      numberOfEssalud: work?.numberOfEssalud,
      dateOfAdmission: work?.dateOfAdmission || ''
    }
  }, [work]);

  const [form, setForm] = useState<ICreateWorkDto>(defaultData);

  const handleChange = ({ name, value }: IInputHandle) => {
    setIsEdit(true)
    setForm(prev => ({
      ...prev,
      [name]: value 
    }))
  }

  const handleSave = async () => {
    toast.dismiss();
    setPending(true);
    await editWork(work?.id || 0, form)
      .then(async data => {
        toast.success(`Los cambios se guardarón correctamente`);
        await findWork(data.id || 0)
          .then(res => dispatch(workActions.find(res)))
          .catch(() => toast.warning(`
            No se pudo obtener los datos, actualice la página`
          )) 
        // disabled edit
        setIsEdit(false);
      }).catch(() => {
        toast.error(`No se pudo guardar los cambios`);
    })
    setPending(false);
  }

  useEffect(() => {
    if (!isEdit) setForm(defaultData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={pending ? undefined : onClose}>
        Editar trabajador
      </ModalHeader>
      <ModalBody>
        <WorkForm form={form}
          onChange={handleChange}
          disabled={pending}
        />
        <Show condition={isEdit}>
          <div className='text-right'>
            <Button color='danger'
              onClick={() => setIsEdit(false)}
              disabled={pending}
            >
              <X className='icon'/> Cancelar
            </Button>

            <Button color='primary'
              className='ml-2'
              onClick={handleSave}
              disabled={pending}
            >
              <RefreshCcw className='icon'/>
            </Button>
          </div>
        </Show>
      </ModalBody>
    </Modal>
  )
}