/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IInputHandle } from '@common/dtos/input-handle';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { ICreatePerson } from '../dtos/create-person.dto';
import { PersonEntity, PersonMaritalStatus } from '../dtos/person.entity';
import { PersonForm } from './person-form';
import { Save } from 'react-feather';
import { createPerson } from '../apis';
import { toast } from 'react-toastify';

interface IProps {
  onClose: () => void
  onSave?: (person: PersonEntity) => void
}

const dataDefault: ICreatePerson = {
  prefix: "Sr(a)",
  name: "",
  lastname: "",
  documentTypeId: "01",
  documentNumber: "",
  badgeId: "",
  dateOfBirth: "",
  gender: "M",
  maritalStatus: PersonMaritalStatus.S,
  address: ""
}

export const PersonCreate = ({ onClose, onSave }: IProps) => {

  const [pending, setPending] = useState<boolean>(false);
  const [form, setForm] = useState<ICreatePerson>(dataDefault)

  const handleOnChange = ({ name, value }: IInputHandle) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setPending(true);
    await createPerson(form)
      .then((data) => {
        toast.success(`Los datos se guardarón correctamente!`)
        if (typeof onSave == 'function') onSave(data);
        setForm(dataDefault);
      }).catch(() => {
        toast.error(`No se pudo guardar los datos`)
      });
    setPending(false);
  }

  return (
    <Modal isOpen>
      <ModalHeader toggle={onClose}>
        Crear Persona
      </ModalHeader>
      <ModalBody>
        <PersonForm
          disabled={pending}
          form={form}
          onChange={handleOnChange}
        />
        <div className='text-right'>
          <Button color='primary'
            onClick={handleSave}
            disabled={pending}
          >
            <Save size={17}/>
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}