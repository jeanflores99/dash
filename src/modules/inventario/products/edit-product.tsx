import React, { useState } from 'react'
import { Col, Modal, ModalBody, ModalHeader, Row, Button, FormGroup, Input } from 'reactstrap';
import { ArrowLeft, Save } from 'react-feather'
import Toggle from '@atlaskit/toggle';
import { UnidadMedida } from './interfaces/Iitem'
import { Iitem } from '@modules/inventario/products/interfaces/Iitem'

interface Iprops {
  onClose: () => void,
  data: Iitem
}
const EditProduct = ({ onClose, data }: Iprops) => {
  const [form, setForm] = useState<Iitem>(data)
  return (
    <Modal isOpen={true}>
      <ModalHeader toggle={onClose}>Editar Item</ModalHeader>
      <ModalBody>

        <div className="mt-2">
          <div className='mb-3'>
            <FormGroup>
              <label>Nombre</label>
              <Input type="text"
                name='nombre'
                placeholder='Ingrese el nombre del item'
                // onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
                className='capitalize'
                value={form?.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Precio/Unidad</label>
              <Input type="text"
                className='capitalize'
                placeholder='Ingrese el Precio/Unidad'
                name='priceunitario'
                value={form?.priceunitario}
              />
            </FormGroup>

            <FormGroup>
              <label>Unidad de Medida</label>
              <select className="form-control" name='discountPrice' value={form.unidadmedida}
              // onChange={({ target }) => handledata({ name: target.name, value: target.value })}
              >

                {/* <option key={99} value={0}>Selec</option> */}
                <option key={1} value={UnidadMedida.Kg}>Kg</option>
                <option key={2} value={UnidadMedida.Litro}>Litro</option>
                <option key={3} value={UnidadMedida.Paquete}>Paquete</option>
                <option key={4} value={UnidadMedida.Und}>Und</option>


                {/* {Clients.map((obj, i) =>
                  <option key={i} value={obj.dscto}>{`${obj.name} ${obj.ape}`}</option>
                )} */}
              </select>
            </FormGroup>

            <FormGroup>
              <label>Tiempo Caducidad/Días</label>
              <Input type="text"
                className='capitalize'
                placeholder='Ingrese su tiempo util'
                // onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
                name='tiempocaducidad'
                value={form?.tiempocaducidad}
              />
            </FormGroup>
            <FormGroup>
              <label>Cantidad</label>
              <Input type="text"
                className='capitalize'
                placeholder='Ingrese la cantidad'
                // onChange={({ target }) => handleOnChange({ name: target.name, value: target.value })}
                name='count'
                value={form?.count}

              />
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
              // onClick={handleSave}
              // disabled={pending}
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
export default EditProduct