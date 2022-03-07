import React, { useState } from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row, Button, FormGroup, Input } from 'reactstrap';
import { InputDto } from '@services/dtos';
import { ICreateAfpDto } from '@modules/planilla/afp/dtos/create-afp.dtos'
import { Save, ArrowLeft, User } from 'react-feather';
import { Afp } from '@modules/planilla/afp/dtos/afp.entity';
import { createAfp } from '../apis';
import { toast } from 'react-toastify';
import Toggle from '@atlaskit/toggle';


interface IProps {
  onClose: () => void
  onSave: (afp: Afp) => void
}


export const AfpCreate = ({ onClose, onSave }: IProps) => {

  const [currentStep, setCurrentStep] = useState(0);
  const [afp, setAfp] = useState<Afp | undefined>(undefined);
  const [pending, setPending] = useState<boolean>(false);
  const [form, setForm] = useState<ICreateAfpDto | undefined>();

  const handleOnChange = ({ name, value }: InputDto) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleAdd = (person: Afp) => {
    setCurrentStep(1);
    setAfp(afp);
    setForm(prev => ({
      ...prev,
      personId: person.id
    }))
  }

  const handleSave = async () => {
    if (typeof form == 'undefined') return;
    setPending(true);
    await createAfp(form as any)
      .then((data) => {
        // setForm(defaultWork);
        setAfp(undefined)
        setCurrentStep(0)
        toast.success(`Los datos se guardarón correctamente!`)
        if (typeof onSave == 'function') onSave(data);
      }).catch(() => toast.error(`Ocurrio un error al guardar los datos`))
    setPending(false);
  }

  const ComponentCreateAfp = (
    <div className="mt-2">
      <div className='mb-3'>
        <FormGroup>
          <label>ID-MANUAL</label>
          <Input type="text"
            className='capitalize'
            value={afp?.aporte}
          />
        </FormGroup>

        <FormGroup>
          <label>Descripción</label>
          <Input type="text"
            className='capitalize'
            value={afp?.descripcion}
          />
        </FormGroup>

        <FormGroup>
          <label>Alias</label>
          <Input type="text"
            className='capitalize'
            value={afp?.prima}
          />
        </FormGroup>

        <FormGroup>
          <label>Ext Presupuestal</label>
          <Input type="text"
            className='capitalize'
            value={afp?.aporte}
          />
        </FormGroup>



        <FormGroup>
          <label>¿Aplica a la Base Imponible?</label>
          <div>
            <Toggle name="base"
              isChecked={form?.estado || false}
            // onChange={({ target }) => handleChange({
            //   name: target.name,
            //   value: target.checked
            // })}
            />
          </div>
        </FormGroup>

        <FormGroup>
          <label>¿Es una Bonificación/Gratificación?</label>
          <div>
            <Toggle name="bonificacion"
              isChecked={form?.estado || false}
            // onChange={({ target }) => handleChange({
            //   name: target.name,
            //   value: target.checked
            // })}
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
      <ModalHeader toggle={onClose}>Crear Categoria</ModalHeader>
      <ModalBody>
        {/* <ProgressIndicator
          selectedIndex={currentStep}
          values={steps}
          appearance={'primary'}
        /> */}
        {/* {currentStep == 0 ? ComponentSearch : null} */}
        {/* {currentStep == 1 ? ComponentCreateWork : null} */}
        {ComponentCreateAfp}
      </ModalBody>
    </Modal>
  )
}
