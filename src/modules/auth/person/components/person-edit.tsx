/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { IInputHandle } from '@common/dtos/input-handle';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { ICreatePerson } from '../dtos/create-person.dto';
import { PersonEntity, PersonMaritalStatus } from '../dtos/person.entity';
import { PersonForm } from './person-form';
import { Save, X } from 'react-feather';
import { editPerson, findPerson } from '../apis';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Show } from '@common/show';
import { personActions } from '../store';
import { IEditPerson } from '../dtos/edit-person.dto';

interface IProps {
  isOpen: boolean,
  onClose: () => void
  onSave?: (person: PersonEntity) => void
}

export const PersonEdit = ({ onClose, onSave, isOpen }: IProps) => {

  const dispatch = useDispatch();
  const { person } = useSelector((state: RootState) => state.person);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const personDefault = (): IEditPerson => {
    return {
      prefix: person?.prefix || 'Sr(a)',
      name: person?.name || '',
      lastname: person?.lastname || '',
      secondaryName: person?.secondaryName || '',
      documentTypeId: person?.documentTypeId || '01',
      documentNumber: person?.documentNumber || '',
      badgeId: person?.badgeId || "010101",
      dateOfBirth: person?.dateOfBirth || '',
      gender: person?.gender || 'M',
      maritalStatus: person?.maritalStatus || PersonMaritalStatus.S, 
      phone: person?.phone || '',
      emailContact: person?.emailContact || '',
      address: person?.address || '',
      state: person?.state || false 
    }
  }

  const [pending, setPending] = useState<boolean>(false);
  const [form, setForm] = useState<IEditPerson>(personDefault());

  const handleOnChange = ({ name, value }: IInputHandle) => {
    setIsEdit(true)
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    toast.dismiss();
    setPending(true);
    const ID = person?.id || 0;
    await editPerson(ID, form)
      .then(async data => {
        toast.success(`Los cambios se guardarón correctamente!`)
        await findPerson(data.id)
          .then(newPerson => {
            dispatch(personActions.setPerson(newPerson))
            if (typeof onSave == 'function') onSave(newPerson);
            setIsEdit(false);
          })
          .catch(() => toast.warning(`Actualize la página para ver los cambios`))
      }).catch(() => toast.error(`No se pudo guardar los cambios`))
    setPending(false);
  }

  useEffect(() => {
    if (!isEdit) setForm(personDefault())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, person])

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={onClose}>
        Editar Persona
      </ModalHeader>
      <ModalBody>
        <PersonForm
          disabled={pending}
          form={form as ICreatePerson}
          onChange={handleOnChange}
        />
        <Show condition={isEdit}>
          <div className='text-right'>
            <Button color='danger'
              onClick={() => setIsEdit(false)}
              disabled={pending}
            >
              <X className='icon'/>
            </Button>

            <Button color='primary'
              className='ml-2'
              onClick={handleSave}
              disabled={pending}
            >
              <Save className='icon'/>
            </Button>
          </div>
        </Show>
      </ModalBody>
    </Modal>
  )
}