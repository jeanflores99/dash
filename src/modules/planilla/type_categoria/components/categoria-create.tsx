import React, { useState } from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row, Button, FormGroup, Input } from 'reactstrap';
import { InputDto } from '@services/dtos';
import { ICreateTypeCategoriaDto } from '../dtos/create-type_categoria.dto'
import { ProgressIndicator } from '@atlaskit/progress-indicator'
import { Save, ArrowLeft, User } from 'react-feather';
// import { PersonSearchSelect } from '@common/person/components/person-search-select';
import { TypeCategoria } from '@modules/planilla/type_categoria/dtos/type_categoria.entity';
import { createTypeCategoria } from '../apis';
import { toast } from 'react-toastify';
import Toggle from '@atlaskit/toggle';


interface IProps {
  onClose: () => void
  onSave: (typecategoria: TypeCategoria) => void
}


export const CategoriaCreate = ({ onClose, onSave }: IProps) => {

  const [currentStep, setCurrentStep] = useState(0);
  const [typecategoria, setTypecategoria] = useState<TypeCategoria | undefined>(undefined);
  const [pending, setPending] = useState<boolean>(false);
  const [form, setForm] = useState<ICreateTypeCategoriaDto | undefined>();

  const handleOnChange = ({ name, value }: InputDto) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleAdd = (person: TypeCategoria) => {
    setCurrentStep(1);
    setTypecategoria(typecategoria);
    setForm(prev => ({
      ...prev,
      personId: person.id
    }))
  }

  const handleSave = async () => {
    if (typeof form == 'undefined') return;
    setPending(true);
    await createTypeCategoria(form as any)
      .then((data) => {
        // setForm(defaultWork);
        setTypecategoria(undefined)
        setCurrentStep(0)
        toast.success(`Los datos se guardarón correctamente!`)
        if (typeof onSave == 'function') onSave(data);
      }).catch(() => toast.error(`Ocurrio un error al guardar los datos`))
    setPending(false);
  }

  const ComponentCreateType_Categoria = (
    <div className="mt-2">
      <div className='mb-3'>
        <FormGroup>
          <label>Información Detallada</label>
          <Input type="textarea"
            className='capitalize'
            value={typecategoria?.information}
          />
        </FormGroup>

        <FormGroup>
          <label>Descripción</label>
          <Input type="text"
            className='capitalize'
            value={typecategoria?.descripcion}
          />
        </FormGroup>

        <FormGroup>
          <label>Dedicación</label>
          <Input type="text"
            className='capitalize'
            value={typecategoria?.dedicacion}
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
      <ModalHeader toggle={onClose}>Crear Categoría</ModalHeader>
      <ModalBody>
        {/* <ProgressIndicator
          selectedIndex={currentStep}
          values={steps}
          appearance={'primary'}
        /> */}
        {/* {currentStep == 0 ? ComponentSearch : null} */}
        {/* {currentStep == 1 ? ComponentCreateWork : null} */}
        {ComponentCreateType_Categoria}
      </ModalBody>
    </Modal>
  )
}
