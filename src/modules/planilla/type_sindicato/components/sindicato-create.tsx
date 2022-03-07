import React, { useState } from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row, Button, FormGroup, Input } from 'reactstrap';
import { InputDto } from '@services/dtos';
import { ICreateTypeSindicatonDto } from '../dtos/create-type_sindicato.dto';
import { ProgressIndicator } from '@atlaskit/progress-indicator'
import { Save, ArrowLeft, User } from 'react-feather';
import Select from '@atlaskit/select';
import { TypeSindicato } from '@modules/planilla/type_sindicato/dtos/type_sindicato.entity';
import { createTypeSindicato } from '../apis';
import { toast } from 'react-toastify';
import Toggle from '@atlaskit/toggle';

// import { WorkEntity } from '../dtos/work.entity';

interface IProps {
  onClose: () => void
  // eslint-disable-next-line no-unused-vars
  onSave: (typesindicato: TypeSindicato) => void
}

// const defaultWork = {
//   personId: 0,
//   afpId: 0,
//   isPrimaSeguro: false,
//   dateOfAdmission: new Date().toLocaleDateString()
// }

export const SindicatoCreate = ({ onClose, onSave }: IProps) => {

  // const [steps] = useState(['person', 'works'])
  const [currentStep, setCurrentStep] = useState(0);
  const [typesindicato, setTypesindicato] = useState<TypeSindicato | undefined>(undefined);
  const [pending, setPending] = useState<boolean>(false);
  const [form, setForm] = useState<ICreateTypeSindicatonDto | undefined>();

  const optionsModo = [
    { label: "Porcentaje", name: 'porcentaje', value: "01" },
    { label: "Modo Estático", name: 'documentTypeId', value: "02" }
  ];

  const handleOnChange = ({ name, value }: InputDto) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleAdd = (person: TypeSindicato) => {
    setCurrentStep(1);
    setTypesindicato(typesindicato);
    setForm(prev => ({
      ...prev,
      personId: person.id
    }))
  }

  const handleSave = async () => {
    if (typeof form == 'undefined') return;
    setPending(true);
    await createTypeSindicato(form as any)
      .then((data) => {
        // setForm(defaultWork);
        setTypesindicato(undefined)
        setCurrentStep(0)
        toast.success(`Los datos se guardarón correctamente!`)
        if (typeof onSave == 'function') onSave(data);
      }).catch(() => toast.error(`Ocurrio un error al guardar los datos`))
    setPending(false);
  }

  const ComponentCreateType_Sindicato = (
    <div className="mt-2">
      <div className='mb-3'>
        <FormGroup>
          <label>Descripción</label>
          <Input type="text"
            className='capitalize'
            value={typesindicato?.type_descuento?.description}
          />
        </FormGroup>


        <FormGroup>
          <label>Tip. Documento <b className="text-danger">*</b></label>
          {/* <SelectBasic
            options={optionsDocuments}
            name="documentTypeId"
            value={form?.documentTypeId || ''}
            onChange={(obj) => handleChange(obj)}
          /> */}
          {/* <Select
            options={optionsModo}
            className={`capitalize cursor-pointer`}
            classNamePrefix="hero"
            placeholder="Seleccionar Modos"
            name={ }
            value={typesindicato?.type_descuento}
            onChange={(option: any) => onChange(option)}
          /> */}
        </FormGroup>

        <FormGroup>
          <label>Alias</label>
          <Input type="text"
            className='capitalize'
            value={typesindicato?.nombre}
          />
        </FormGroup>

        <FormGroup>
          <label>Ext Presupuestal</label>
          <Input type="text"
            className='capitalize'
            value={typesindicato?.porcentaje}
          />
        </FormGroup>



        <FormGroup>
          <label>¿Aplica a la Base Imponible?</label>
          <div>
            <Toggle name="base"
              isChecked={form?.is_porcentaje || false}
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
              isChecked={form?.is_porcentaje || false}
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
      <ModalHeader toggle={onClose}>Crear Sindicato</ModalHeader>
      <ModalBody>
        {/* <ProgressIndicator
          selectedIndex={currentStep}
          values={steps}
          appearance={'primary'}
        /> */}
        {/* {currentStep == 0 ? ComponentSearch : null} */}
        {/* {currentStep == 1 ? ComponentCreateWork : null} */}
        {ComponentCreateType_Sindicato}

      </ModalBody>
    </Modal>
  )
}
