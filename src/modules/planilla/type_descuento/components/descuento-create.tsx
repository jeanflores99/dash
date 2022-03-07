import React, { useState } from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row, Button, FormGroup, Input } from 'reactstrap';
import { InputDto } from '@services/dtos';
import { ICreateTypeDescuentoDto } from '../dtos/create-type_descuento.dto'
import { Save, ArrowLeft, User } from 'react-feather';
import { TypeDescuento } from '@modules/planilla/type_descuento/dtos/type_descuento.enitity'
import { createTypeDescuento } from '../apis';
import { toast } from 'react-toastify';
import Toggle from '@atlaskit/toggle';


interface IProps {
  onClose: () => void
  onSave: (typedescuento: TypeDescuento) => void
}


export const DescuentoCreate = ({ onClose, onSave }: IProps) => {

  const [currentStep, setCurrentStep] = useState(0);
  const [typeremuneration, setTyperemuneration] = useState<TypeDescuento | undefined>(undefined);
  const [pending, setPending] = useState<boolean>(false);
  const [form, setForm] = useState<ICreateTypeDescuentoDto | undefined>();

  const handleOnChange = ({ name, value }: InputDto) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleAdd = (person: TypeDescuento) => {
    setCurrentStep(1);
    setTyperemuneration(typeremuneration);
    setForm(prev => ({
      ...prev,
      personId: person.id
    }))
  }

  const handleSave = async () => {
    if (typeof form == 'undefined') return;
    setPending(true);
    await createTypeDescuento(form as any)
      .then((data) => {
        // setForm(defaultWork);
        setTyperemuneration(undefined)
        setCurrentStep(0)
        toast.success(`Los datos se guardarón correctamente!`)
        if (typeof onSave == 'function') onSave(data);
      }).catch(() => toast.error(`Ocurrio un error al guardar los datos`))
    setPending(false);
  }

  const ComponentCreateType_Remuneration = (
    <div className="mt-2">
      <div className='mb-3'>
        <FormGroup>
          <label>ID-MANUAL</label>
          <Input
            type="text"
            name='key'
            className='capitalize'
            value={typeremuneration?.key}
          />
        </FormGroup>

        <FormGroup>
          <label>Descripción</label>
          <Input
            type="text"
            className='capitalize'
            name='description'
            value={typeremuneration?.description}
          />
        </FormGroup>


        <FormGroup>
          <label>¿Mostrar en el Reporte Plame?</label>
          <div>
            <Toggle
              name="base"
              isChecked={form?.plame || false}
              onChange={({ target }) => handleOnChange({
                name: target.name,
                value: target.checked
              })}
            />
          </div>
        </FormGroup>

        <FormGroup>
          <label>Edición</label>
          <div>
            <Toggle name="bonificacion"
              isChecked={form?.isEdit || false}
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
