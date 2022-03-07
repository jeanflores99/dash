import React, { useState } from 'react'
import { Col, Modal, ModalBody, ModalHeader, Row, Button, FormGroup, Input } from 'reactstrap';
import Toggle from '@atlaskit/toggle';
import { Save, ArrowLeft } from 'react-feather';
import { IClientes } from '@common/tables/interface/client'

export interface Iprops {
  onClose: () => void,
  data: IClientes
}
const ClientEdit = ({ onClose, data }: Iprops) => {
  const [form, setForm] = useState<IClientes>(data)
  const handleOnChange = ({ name, value }: any) => {
    setForm({ ...form, [name]: value })
  }
  return (
    <Modal isOpen={true}>
      <ModalHeader toggle={onClose}>Editar Cliente</ModalHeader>
      <ModalBody>
        <div className="mt-2">
          <div className='mb-3'>
            <FormGroup>
              <label>Nombres</label>
              <Input type="text"
                name='code'
                value={data.name || ''}
                onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}

                className='capitalize'
              />
            </FormGroup>

            <FormGroup>
              <label>Apellidos</label>
              <Input type="text"
                className='capitalize'
                value={data.ape || ''}
                onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
                name='description'
              />
            </FormGroup>

            <FormGroup>
              <label>Visitas</label>
              <Input type="text"
                className='capitalize'
                value={data.visitas || ''}
                onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
                name='name'
              // value={form?.name}

              />
            </FormGroup>

            <FormGroup>
              <label>Descuento</label>
              <Input type="text"
                value={data.dscto || ''}
                className='dscto'
                onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
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
export default ClientEdit
