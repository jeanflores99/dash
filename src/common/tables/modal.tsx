import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, Container, Col, Card, Row, FormGroup, Nav, UncontrolledButtonDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonToolbar, ButtonGroup, InputGroupAddon, InputGroupText, Button, Input, ModalFooter, CardBody } from 'reactstrap'
import TableDetails from './table'
import { IMesa } from './interface/mesa'
import CobrarMesa from './cobrarmesa'
import { Clients } from './dto/clients'
import { UserPlus, CreditCard, DollarSign } from 'react-feather'
import { useRouter } from 'next/router'
import Tabs from '@modules/restaurant/mesas/tabs'
import Swal from 'sweetalert2'
import ComprobanteTab from '@modules/restaurant/mesas/comprobanteTab'

interface Iprops {
  close: () => void,
  data: IMesa
}

const ViewModal = ({ close, data }: Iprops) => {
  const [option, setOption] = useState('UNDEFINED')
  const [comprobante, setComprobante] = useState('UNDEFINED')
  const [form, setForm] = useState<IMesa>(data)
  const router = useRouter()

  const RenderSwitch: any = {
    COBRAR: <CobrarMesa
      close={() => setOption('UNDEFINED')}
    />,
    UNDEFINED: undefined
  }

  const RenderComprobante: any = {
    COMPROBANTE: <ComprobanteTab
      onClose={() => setComprobante('UNDEFINED')}
    />,
    UNDEFINED: undefined
  }

  const optionComprobate = async () => {
    await Swal.fire({
      title: '¿Generar Comprobante?',
      // showDenyButton: true,
      icon: 'question',
      showCancelButton: true,
      // denyButtonText: 'No',
      confirmButtonText: 'Si',

      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
        setComprobante('COMPROBANTE')
      } else if (result.isDismissed) {
        Swal.fire('Venta realizada', '', 'success')
      }
    })

  }
  const handledata = ({ name, value }: any) => {
    console.log(name, value)
    setForm({
      ...form,
      [name]: parseFloat(value)
    })
  }
  return (<>
    <Modal fullscreen='xl' size="xl" isOpen={true}>
      <ModalHeader toggle={close} >
        <div>
          Mesa: {form.id || ''}
        </div>
        <div>
          {form.note || ''}
        </div>



        {/* hola */}
        {/* <span>Mesa: {data?.id || ''}</span> */}
        {/* <hr /> */}
        {/* <div className="product-price"> */}

        <p className='  product-price '>
          {/* Total: S/ {form.price || ''} */}
          {form.discountPrice > 0 ? <>
            Total: S/{(form.price - (form.price * form.discountPrice)) || ''}
            <del className='product-price'>S/{form.price}</del>
          </> : `Total: S/${form.price || ''}`}
          {/* {form?.discountPrice > 0 ? <del className=' product-price'>S/{form.discountPrice}</del> : null} */}
        </p>
        {/* */}

        {/* </div> */}
        {/* <hr /> */}

        {/* <div className="product-view"> */}
        {/* <h6 className="f-w-600">Detalle Consumo</h6> */}
        {/* <p className="mb-0">breve descripcion</p> */}
        {/* </div> */}

        {/* <div className="product-qnty"> */}

        {/* <Link href={`${process.env.PUBLIC_URL}/app/ecommerce/cart`}><Button color="primary" className="mr-2 mt-2" >{'AddToCart'}</Button></Link> */}
        {/* </div> */}
      </ModalHeader>
      <ModalBody >
        <Container fluid={true}>
          <Row>
            <Col className='call-chat-body'>
              <Card>
                <CardBody className="p-0">
                  <Row className='chat-box'>
                    <Col lg='8' className='pr-0 chat-right-aside'>
                      <FormGroup className='row p-2'>
                        <select className="form-control col-11 p-1" name='discountPrice' size={1} onChange={({ target }) => handledata({ name: target.name, value: target.value })}>
                          <option key={99} value={0}>Seleccione Cliente</option>

                          {Clients.map((obj, i) =>
                            <option key={i} value={obj.dscto}>{`${obj.name} ${obj.ape}`}</option>
                          )}
                        </select>
                        <Button className='col-1 p-1 ' outline color='info' onClick={() => router.push('/restaurant/clients')}>
                          <UserPlus />
                        </Button>
                      </FormGroup>

                      <TableDetails
                        key={form.id}
                        data={form?.consumo}
                      />
                    </Col>
                    <Col lg='4' className='pl-3 chat-menu'>
                      <Tabs />

                    </Col>
                  </Row>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>






        <UncontrolledButtonDropdown>
          <DropdownToggle caret>
            Cobrar
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => optionComprobate()}
            >
              Efectivo
            </DropdownItem>
            <DropdownItem
              onClick={() => setOption('COBRAR')}
            >
              Tarjeta
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>

      </ModalFooter>
    </Modal>
    {RenderSwitch[option]}
    {RenderComprobante[comprobante]}
  </>
  )
}
export default ViewModal