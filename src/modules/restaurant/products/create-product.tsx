import React, { useState } from 'react'
import { Col, Modal, ModalBody, ModalHeader, Row, Button, FormGroup, Input } from 'reactstrap';
import { Save, ArrowLeft } from 'react-feather';
import { Iproduct } from '@common/products/interfaces/IProduct'
import { TypeProduct } from '@common/products/interfaces/ITypeProduc'
import Toggle from '@atlaskit/toggle';



interface Iprops {
  onClose: () => void
}

export const CreateProduct = ({ onClose }: Iprops) => {
  const [form, setForm] = useState<Iproduct>({})
  return (
    <Modal isOpen={true}>
      <ModalHeader toggle={onClose}>Crear Producto</ModalHeader>
      <ModalBody>
        <div className="mt-2">
          <div className='mb-3'>
            <FormGroup>
              <label>Nombre</label>
              <Input type="text"
                name='code'
                // onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
                className='capitalize'
              />
            </FormGroup>

            <FormGroup>
              <label>Cantidad</label>
              <Input type="text"
                className='capitalize'
                // onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
                name='description'
              />
            </FormGroup>

            <FormGroup>
              <label>Precio</label>
              <Input type="text"
                className='capitalize'
                // onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
                name='name'
              // value={form?.name}

              />
            </FormGroup>

            <FormGroup>
              <label>Tipo Producto</label>
              <select className="form-control" name='TypeProduct'
              // onChange={({ target }) => handledata({ name: target.name, value: target.value })}
              >

                {/* <option key={99} value={0}>Selec</option> */}
                <option key={1} value={TypeProduct.Bebida}>Comida</option>
                <option key={2} value={TypeProduct.Comida}>Bebidas</option>
                <option key={3} value={TypeProduct.Extras}>Extras</option>


                {/* {Clients.map((obj, i) =>
                  <option key={i} value={obj.dscto}>{`${obj.name} ${obj.ape}`}</option>
                )} */}
              </select>
            </FormGroup>


            <FormGroup>
              <label>¿Producto Habilitado?</label>
              <div>
                <Toggle
                  name="state"

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
