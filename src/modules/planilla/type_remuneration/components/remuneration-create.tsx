import React, { useState } from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row, Button, FormGroup, Input } from 'reactstrap';
// import { WorkForm } from './work-form';
import { InputDto } from '@services/dtos';
import { ICreateTypeRemunerationDto } from '../dtos/create-type_remunerations.dto';
import { ProgressIndicator } from '@atlaskit/progress-indicator'
import { Save, ArrowLeft, User } from 'react-feather';
// import { PersonSearchSelect } from '@common/person/components/person-search-select';
import { TypeRemuneration } from '@modules/planilla/type_remuneration/dtos/type_remuneration.entity';
import { createTypeRemuneration } from '../apis';
import { toast } from 'react-toastify';
import Toggle from '@atlaskit/toggle';

interface IProps {
  onClose: () => void
  onSave: (typeremuneration: TypeRemuneration) => void
}

export const defaultTypeRemuneration = {
  code: '',
  name: '',
  description: '',
  isBase: true,
  isBonificacion: false,
}

export const RemunerationCreate = ({ onClose, onSave }: IProps) => {

  const [pending, setPending] = useState<boolean>(false);
  const [form, setForm] = useState<ICreateTypeRemunerationDto>(defaultTypeRemuneration);

  const handleOnChange = ({ name, value }: InputDto) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSave = async () => {
    if (typeof form == 'undefined') return;
    setPending(true);
    await createTypeRemuneration(form as any)
      .then((data) => {
        setForm(defaultTypeRemuneration);
        toast.success(`Los datos se guardarón correctamente!`)
        if (typeof onSave == 'function') onSave(data);
      }).catch(() => toast.error(`Ocurrió un error al guardar los datos`))
    setPending(false);
    onClose()
  }

  const ComponentCreateType_Remuneration = (
    <div className="mt-2">
      <div className='mb-3'>
        <FormGroup>
          <label>ID-MANUAL</label>
          <Input type="text"
            name='code'
            onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
            className='capitalize'
            value={form?.code}
          />
        </FormGroup>

        <FormGroup>
          <label>Descripción</label>
          <Input type="text"
            className='capitalize'
            onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
            name='description'
            value={form?.description}
          />
        </FormGroup>

        <FormGroup>
          <label>Alias</label>
          <Input type="text"
            className='capitalize'
            onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
            name='name'
            value={form?.name}
          />
        </FormGroup>





        <FormGroup>
          <label>¿Aplica a la Base Imponible?</label>
          <div>
            <Toggle
              name="isBase"
              isChecked={form?.isBase || false}
              onChange={({ target }) => handleOnChange({
                name: target.name,
                value: target.checked
              })}
            />
          </div>
        </FormGroup>

        <FormGroup>
          <label>¿Es una Bonificación/Gratificación?</label>
          <div>
            <Toggle
              name="isBonification"
              isChecked={form?.isBonification || false}
              onChange={({ target }) => handleOnChange({
                name: target.name,
                value: target.checked
              })}
            />
          </div>
        </FormGroup>
        <hr />
      </div>
      {/* <WorkForm
        form={form}
        onChange={handleOnChange}
      /> */}
      <Row className='justify-content-center'>
        <Col md="6 col-6 text-left">
          <Button color='secundary'
            title='Atras'
            onClick={() => onClose()}
            disabled={pending}
          >
            <ArrowLeft size={17} />
          </Button>
        </Col>

        <Col md="6 col-6 text-right">
          <Button color='primary'
            title='Guardar datos'
            onClick={handleSave}
            disabled={pending}
          >
            <Save size={17} />
          </Button>
        </Col>
      </Row>
    </div>
  )

  // const ComponentSearch = (
  //   <div className='mt-5'>
  //     <label><User size={15} /> Validar Persona</label>
  //     <PersonSearchSelect
  //       onAdd={handleAdd}
  //     />
  //   </div>
  // )

  return (
    <Modal isOpen={true}>
      <ModalHeader toggle={onClose}>Crear trabajador</ModalHeader>
      <ModalBody>
        {/* <ProgressIndicator
          selectedIndex={currentStep}
          values={steps}
          appearance={'primary'}
        /> */}
        {/* {currentStep == 0 ? ComponentSearch : null} */}
        {/* {currentStep == 1 ? ComponentCreateWork : null} */}
        {ComponentCreateType_Remuneration}
      </ModalBody>
    </Modal>
  )
}
