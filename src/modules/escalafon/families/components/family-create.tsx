/* eslint-disable no-unused-vars */
import { IInputHandle } from "@common/dtos/input-handle";
import { PersonEntity } from "@modules/auth/person/dtos/person.entity";
import { RootState } from "@store/store";
import { useState } from "react";
import { Save } from "react-feather";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { createFamily } from "../apis";
import { IFamilyFormDto } from "../dtos/family-form.dto";
import { IFamilyEntity } from "../dtos/family.entity.dto";
import { FamilyForm } from "./family-form";

interface IProps {
  isOpen: boolean,
  onClose: () => void,
  onSave?: (family: IFamilyEntity) => void
}

export const FamilyCreate = ({ isOpen, onClose, onSave }: IProps) => {

  const { work } = useSelector((state: RootState) => state.work);

  const defaultData: IFamilyFormDto = {
    workId: work?.id || 0,
    personId: 0,
    mode: "CHILD"
  }

  const [pending, setPending] = useState<boolean>(false)
  const [form, setForm] = useState<IFamilyFormDto>(defaultData);

  const handleForm = ({ name, value }: IInputHandle) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddPerson = (person: PersonEntity) => {
    const newForm = Object.assign({}, form);
    newForm.person = person;
    newForm.personId = person.id;
    setForm(newForm);
  }

  const handleRemovePerson = () => {
    const newForm = Object.assign({}, form);
    newForm.person = undefined;
    newForm.personId = 0;
    setForm(newForm);
  }

  const handleSave = async () => {
    toast.dismiss();
    setPending(true)
    await createFamily(form)
      .then((data) => {
        toast.success(`Los datos seguardarón correctamente!`)
        setForm(defaultData)
        if (typeof onSave == 'function') onSave(data)
      })
      .catch(() => toast.error(`No se pudo guardar los datos`))
    setPending(false)
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={onClose}>Nuevo Familiar</ModalHeader>
      <ModalBody>
        <FamilyForm
          form={form}
          onChange={handleForm}
          onAddPerson={handleAddPerson}
          onRemovePerson={handleRemovePerson}
        />
        {/* save */}
        <div className='text-right'>
          <Button color='primary'
            disabled={pending}
            onClick={handleSave}
          > 
            <Save className="icon"/>
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}