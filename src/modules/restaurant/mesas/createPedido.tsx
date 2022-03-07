import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, Container, Col, Card, Row, FormGroup, Nav, NavItem, NavLink, InputGroupAddon, InputGroupText, Button, Input, ModalFooter, CardBody } from 'reactstrap'
import { Save, ArrowLeft } from 'react-feather'
import { Iproduct } from '@common/products/interfaces/IProduct'
export interface Iprops {
  onClose: () => void,
  Current: Iproduct
}

const CreatePedido = ({ onClose, Current }: Iprops) => {
  const [data, setData] = useState(Current)
  return (
    <Modal size="sm" isOpen={true} centered>




      <ModalHeader toggle={onClose} >
        Argegar Pedido
      </ModalHeader>
      <ModalBody>
        <div className="mt-2">
          <div className='mb-3'>
            <FormGroup>
              <label>Nombre</label>
              <Input type="text"
                className='capitalize'
                value={data.name || ''}
                readOnly
                name='name'
              // value={afp?.aporte}
              />
            </FormGroup>
            <FormGroup>
              <label> Disponibles</label>
              <Input type="text"
                className='capitalize'
                name='countAvailable'
                readOnly
                value={data.count || ''}
              />
            </FormGroup>

            <FormGroup>
              <label>Pedir</label>
              <Input type="text"
                className='capitalize'
                name='countPedid'
                // readOnly
                value={'1'}
              />
            </FormGroup>
            <FormGroup>
              <label>Precio</label>
              <Input type="text"
                className='capitalize'
                name='price'
                readOnly
                value={'S/' + data.precio || ''}
              />
            </FormGroup>
            <FormGroup>
              <label>Total</label>
              <Input type="text"
                className='capitalize'
                readOnly
                value={'S/' + data.precio}
              />
            </FormGroup>

          </div>
        </div>
        <Row className='justify-content-center'>
          <Col md="6 col-6 text-left">
            <Button color='secundary'
              title='Atras'
              onClick={() => onClose()}
            // disabled={pending}
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
      </ModalBody>
    </Modal>
  )
}
export default CreatePedido