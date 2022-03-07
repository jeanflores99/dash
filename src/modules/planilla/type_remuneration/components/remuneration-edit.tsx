import React, { useState } from 'react'
import { Col, Modal, ModalBody, ModalHeader, Row, Button, FormGroup, Input } from 'reactstrap';
import { TypeRemuneration } from '@modules/planilla/type_remuneration/dtos/type_remuneration.entity';
import Toggle from '@atlaskit/toggle';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Save, ArrowLeft, User } from 'react-feather';
import { InputDto } from '@services/dtos';
import { updateTypeRemuneration } from '@modules/planilla/type_remuneration/apis'
import { toast } from 'react-toastify';

interface IProps {
  onClose: () => void,
  onSave: (typeRemuneration: TypeRemuneration) => void
}

export const RemunerationEdit = ({ onClose, onSave }: IProps) => {
  const { type_remuneration } = useSelector((state: RootState) => state.type_remuneration)
  const [form, setForm] = useState<TypeRemuneration>(type_remuneration)
  const [pending, setPending] = useState<boolean>(false);

  const handleInput = ({ name, value }: InputDto) => {
    setForm({ ...form, [name]: value })
  }

  const handleSave = async () => {
    setPending(true)
    await updateTypeRemuneration(type_remuneration.id, form)
      .then((data) => {
        toast.success('Los datos se guardaron correctamente')
        if (typeof onSave == 'function') onSave(data)
      })
      .catch(() => toast.error('Ocrruio un error al actulizar los datos'))
    setPending(false)
    onClose()
  }
  const ComponenteEditType_Remuneration = (
    <div className="mt-2">
      <div className='mb-3'>
        <FormGroup>
          <label>ID-MANUAL</label>
          <Input type="text"
            className='capitalize'
            name="code"
            onChange={({ target }) => handleInput(target)}
            value={form?.code || ''}
          />
        </FormGroup>

        <FormGroup>
          <label>Alias</label>
          <Input type="text"
            className='capitalize'
            name='name'
            onChange={({ target }) => handleInput(target)}
            defaultValue={form?.name || ''}
          />
        </FormGroup>

        <FormGroup>
          <label>Descripción</label>
          <Input type="text"
            className='capitalize'
            name='description'
            onChange={({ target }) => handleInput(target)}
            defaultValue={form?.description || ''}
          />
        </FormGroup>

        <FormGroup>
          <label>¿Aplica a la Base Imponible?</label>
          <div>
            <Toggle
              name="base"
              defaultChecked={form?.isBase || false}
              onChange={({ target }) => handleInput({
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
              name="bonificacion"
              defaultChecked={form?.isBonification || false}
              onChange={({ target }) => handleInput({
                name: target.name,
                value: target.checked
              })}
            />
          </div>
        </FormGroup>
        <hr />
      </div>

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

  return (
    <Modal isOpen={true}>
      <ModalHeader toggle={onClose}>Editar Tip. Remuneración</ModalHeader>
      <ModalBody>
        {/* <ProgressIndicator
        selectedIndex={currentStep}
        values={steps}
        appearance={'primary'}
      /> */}
        {/* {currentStep == 0 ? ComponentSearch : null} */}
        {/* {currentStep == 1 ? ComponentCreateWork : null} */}
        {/* {ComponentCreateType_Remuneration} */}
        {ComponenteEditType_Remuneration}
      </ModalBody>
    </Modal>
  )
}
