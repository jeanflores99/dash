import React, { useState } from 'react'
import { Col, Modal, ModalBody, ModalHeader, Row, Button, FormGroup, Input } from 'reactstrap';
import Toggle from '@atlaskit/toggle';
import { Save, ArrowLeft } from 'react-feather';
export interface Iprops {
  onClose: () => void
}
const ClientCreate = ({ onClose }: Iprops) => {
  const [form, setForm] = useState({})
  return (
    <Modal isOpen={true}>
      <ModalHeader toggle={onClose}>Crear Cliente</ModalHeader>
      <ModalBody>
        <div className="mt-2">
          <div className='mb-3'>
            <FormGroup>
              <label>Nombres</label>
              <Input type="text"
                name='code'
                // onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
                className='capitalize'
              />
            </FormGroup>

            <FormGroup>
              <label>Apellidos</label>
              <Input type="text"
                className='capitalize'
                // onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
                name='description'
              />
            </FormGroup>

            <FormGroup>
              <label>Visitas</label>
              <Input type="text"
                className='capitalize'
                // onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
                name='name'
              // value={form?.name}

              />
            </FormGroup>

            <FormGroup>
              <label>Descuento</label>
              <Input type="text"
                className='dscto'
                // onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
                name='name'
              // value={form?.name}

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
              >
                <ArrowLeft size={17} />
              </Button>
            </Col>

            <Col md="6 col-6 text-right">
              <Button color='primary'
                title='Guardar datos'
              >
                <Save size={17} />
              </Button>
            </Col>
          </Row>
        </div>


      </ModalBody>
    </Modal>
  )
}
export default ClientCreate
