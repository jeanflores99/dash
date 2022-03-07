import React, { useState } from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row, Button, FormGroup, Input } from 'reactstrap';
import { InputDto } from '@services/dtos';
import { ICreateTypeDescuentoDto } from '../dtos/create-type_aportacion.dto'
import { Save, ArrowLeft, User } from 'react-feather';
import { TypeAportacion } from '@modules/planilla/type_aportacion/dtos/type_aportacion.enitity'
import { createTypeAportacion } from '../apis';
import { toast } from 'react-toastify';
import Toggle from '@atlaskit/toggle';


interface IProps {
  onClose: () => void
  onSave: (typedescuento: TypeAportacion) => void
}


export const AportacionCreate = ({ onClose, onSave }: IProps) => {

  const [currentStep, setCurrentStep] = useState(0);
  const [typeaportacion, setTypeaportacion] = useState<TypeAportacion | undefined>(undefined);
  const [pending, setPending] = useState<boolean>(false);
  const [form, setForm] = useState<ICreateTypeDescuentoDto | undefined>();

  const handleOnChange = ({ name, value }: InputDto) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleAdd = (person: TypeAportacion) => {
    setCurrentStep(1);
    setTypeaportacion(typeaportacion);
    setForm(prev => ({
      ...prev,
      personId: person.id
    }))
  }

  const handleSave = async () => {
    if (typeof form == 'undefined') return;
    setPending(true);
    await createTypeAportacion(form as any)
      .then((data) => {
        setTypeaportacion(undefined)
        setCurrentStep(0)
        toast.success(`Los datos se guardarón correctamente!`)
        if (typeof onSave == 'function') onSave(data);
      }).catch(() => toast.error(`Ocurrio un error al guardar los datos`))
    setPending(false);
  }

  const ComponentCreateType_Aportacion = (
    <div className="mt-2">
      <div className='mb-3'>
        <FormGroup>
          <label>ID-MANUAL</label>
          <Input type="text"
            className='capitalize'
            value={typeaportacion?.key}
          />
        </FormGroup>


        <FormGroup>
          <label>Porcentaje</label>
          <Input type="text"
            className='capitalize'
            value={typeaportacion?.name}
          />
        </FormGroup>

        <FormGroup>
          <label>Mínimo</label>
          <Input type="text"
            className='capitalize'
            value={typeaportacion?.min}
          />
        </FormGroup>
        <FormGroup>
          <label>Predeterminado</label>
          <Input type="text"
            className='capitalize'
            value={typeaportacion?.default}
          />
        </FormGroup>
        <FormGroup>
          <label>Ext Presupuestal</label>
          <Input type="text"
            className='capitalize'
            value={typeaportacion?.ext_pptto}
          />
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
      <ModalHeader toggle={onClose}>Crear Aportación</ModalHeader>
      <ModalBody>
        {/* <ProgressIndicator
          selectedIndex={currentStep}
          values={steps}
          appearance={'primary'}
        /> */}
        {/* {currentStep == 0 ? ComponentSearch : null} */}
        {/* {currentStep == 1 ? ComponentCreateWork : null} */}
        {ComponentCreateType_Aportacion}
      </ModalBody>
    </Modal>
  )
}
