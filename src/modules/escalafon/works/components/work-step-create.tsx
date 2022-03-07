import React, { useState } from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row, Button, FormGroup, Input } from 'reactstrap';
import { WorkForm } from './work-form';
import { InputDto } from '@services/dtos';
import { ICreateWorkDto } from '../dtos/create-work.dto';
import { ProgressIndicator } from '@atlaskit/progress-indicator'
import { Save, ArrowLeft, User } from 'react-feather';
import { PersonSearchSelect } from '@modules/auth/person/components/person-search-select';
import { PersonEntity } from '@modules/auth/person/dtos/person.entity';
import { createWork } from '../apis';
import { toast } from 'react-toastify';
import { WorkEntity } from '../dtos/work.entity';

interface IProps {
  onClose: () => void
  // eslint-disable-next-line no-unused-vars
  onSave: (work: WorkEntity) => void
}

const defaultWork = {
  personId: 0,
  afpId: 0,
  isPrimaSeguro: false,
  dateOfAdmission: new Date().toLocaleDateString()
}

export const WorkStepCreate = ({ onClose, onSave }: IProps) => {

  const [steps] = useState(['person', 'works'])
  const [currentStep, setCurrentStep] = useState(0);
  const [person, setPerson] = useState<PersonEntity | undefined>(undefined);
  const [pending, setPending] = useState<boolean>(false);
  const [form, setForm] = useState<ICreateWorkDto>(defaultWork);

  const handleOnChange = ({ name, value }: InputDto) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleAdd = (person: PersonEntity) => {
    setCurrentStep(1);
    setPerson(person);
    setForm(prev => ({
      ...prev,
      personId: person.id
    }))
  }

  const handleSave = async () => {
    if (typeof form == 'undefined') return;
    setPending(true);
    await createWork(form as any)
      .then((data) => {
        setForm(defaultWork);
        setPerson(undefined)
        setCurrentStep(0)
        toast.success(`Los datos se guardarón correctamente!`)
        if (typeof onSave == 'function') onSave(data);
      }).catch(() => toast.error(`Ocurrio un error al guardar los datos`))
    setPending(false);
  }

  const ComponentCreateWork = (
    <div className="mt-2">
      <div className='mb-3'>
        <FormGroup>
          <label>Apellidos y Nombres</label>
          <Input type="text"
            className='capitalize'
            readOnly
            value={`${person?.fullName || ''}`.toLowerCase()}
          />
        </FormGroup>

        <FormGroup>
          <label>Tipo Documento</label>
          <Input type="text"
            className='uppercase'
            readOnly
            value={`${person?.documentType?.name || ''}`.toLowerCase()}
          />
        </FormGroup>

        <FormGroup>
          <label>N° Documento</label>
          <Input type="text"
            className='capitalize'
            readOnly
            value={person?.documentNumber}
          />
        </FormGroup>
        <hr />
      </div>
      <WorkForm
        form={form}
        onChange={handleOnChange}
      />
      <Row className='justify-content-center'>
        <Col md="6 col-6 text-left">
          <Button color='secundary'
            title='Atras'
            onClick={() => setCurrentStep(0)}
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

  const ComponentSearch = (
    <div className='mt-5'>
      <label><User size={15} /> Validar Persona</label>
      <PersonSearchSelect
        onAdd={handleAdd}
      />
    </div>
  )

  return (
    <Modal isOpen={true}>
      <ModalHeader toggle={onClose}>Crear trabajador</ModalHeader>
      <ModalBody>
        <ProgressIndicator
          selectedIndex={currentStep}
          values={steps}
          appearance={'primary'}
        />
        {currentStep == 0 ? ComponentSearch : null}
        {currentStep == 1 ? ComponentCreateWork : null}
      </ModalBody>
    </Modal>
  )
}
