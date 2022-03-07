import React, { useState } from 'react'
import { Modal, ModalHeader, Nav, NavItem, NavLink, Col, TabContent, TabPane, ModalBody, FormGroup, Card, CardHeader, CardBody, Row, InputGroup, InputGroupAddon, InputGroupText, Button, Input, ModalFooter } from 'reactstrap'
import { ArrowLeft, Save } from 'react-feather'
export interface IProps {
  onClose: () => void
}
const ComprobanteTab = ({ onClose }: IProps) => {
  const [BasicLineTab, setBasicLineTab] = useState('1')
  return (
    <Modal size='md' isOpen={true}>
      <ModalHeader toggle={onClose} >
        Seleecione   <i className="icofont icofont-file-document" />
      </ModalHeader>
      <ModalBody>
        <Nav tabs className="nav border-tab nav-primary">
          <NavItem id="mycd Tab" role="tablist" style={{ cursor: 'pointer' }}>
            <NavLink tag="a" className={BasicLineTab === '1' ? 'active' : ''} onClick={() => setBasicLineTab('1')}>
              {/* <i className="icofont icofont-fork-and-knife" /> */}
              <h5>Boleta</h5>
            </NavLink>
          </NavItem>
          <NavItem id="myTab" role="tablist" style={{ cursor: 'pointer' }}>
            <NavLink tag="a" className={BasicLineTab === '2' ? 'active' : ''} onClick={() => setBasicLineTab('2')}>
              <h5>Factura</h5>
            </NavLink>
          </NavItem>

        </Nav>
        {/* <span className='badge badge-info mb-1'>Nuestra carta</span> */}
        <TabContent activeTab={BasicLineTab} className=''>
          <TabPane tabId="1">

            <div className="mt-2">
              <div className='mb-3'>
                <FormGroup>
                  <label>Nombre y Apellido</label>
                  <Input type="text"
                    className='capitalize'
                    // value={data.name || ''}
                    placeholder='Ingrese su nombres y apellido'
                    name='name'
                  // value={afp?.aporte}
                  />
                </FormGroup>
                <FormGroup>
                  <label> Dni</label>
                  <Input type="text"
                    placeholder='Ingrese su DNI'
                    className='capitalize'
                    name='countAvailable'
                  // value={data.countAvailable || ''}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Dirección</label>
                  <Input type="text"
                    placeholder='Ingrese un dirección'
                    className='capitalize'
                    name='countPedid'
                  // readOnly
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

                >
                  <Save size={17} />
                </Button>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <div className="mt-2">
              <div className='mb-3'>
                <FormGroup>
                  <label>Ruc</label>
                  <Input type="text"
                    className='capitalize'
                    // value={data.name || ''}
                    placeholder='Ingrese su Ruc'
                    name='name'
                  // value={afp?.aporte}
                  />
                </FormGroup>
                <FormGroup>
                  <label> Razon Social</label>
                  <Input type="text"
                    placeholder='Ingrese su Razon social'
                    className='capitalize'
                    name='countAvailable'
                  // value={data.countAvailable || ''}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Dirección</label>
                  <Input type="text"
                    placeholder='Ingrese un dirección'
                    className='capitalize'
                    name='countPedid'
                  // readOnly
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

                >
                  <Save size={17} />
                </Button>
              </Col>
            </Row>
          </TabPane>

        </TabContent>
      </ModalBody>
    </Modal >
  )
}
export default ComprobanteTab