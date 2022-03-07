import ComprobanteTab from '@modules/restaurant/mesas/comprobanteTab'
import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, FormGroup, Card, CardHeader, CardBody, Row, InputGroup, InputGroupAddon, InputGroupText, Button, Input, ModalFooter } from 'reactstrap'
import Swal from 'sweetalert2'
export const SelectMonth = ["Mes", "Enero", "Febrero", "Marzo", "Abril"]
export const SelectYear = ["Año", "2015", "2016", "2017", "2018", "2021"]
interface Iprops {
  close: () => void
}

const CobrarMesa = ({ close }: Iprops) => {
  const [comprobante, setComprobante] = useState('UNDEFINED')

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
  return (
    <>
      <Modal size='md' isOpen={true}>
        <ModalHeader toggle={close} >
          <Card className="height-equal">
            <CardHeader>
              <h5>Tarjeta</h5>
            </CardHeader>
            <CardBody>
              <Row className="theme-form e-commerce-form" form>
                <FormGroup className="col-6 p-r-0">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Full name here"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Card number"
                  />
                </FormGroup>
                <FormGroup className="col-6 p-r-0">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="CVV number"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="CVC"
                  />
                </FormGroup>
                <div className="col-12">
                  <label className="col-form-label p-t-0">
                    {'ExpirationDate'}
                  </label>
                </div>
                <FormGroup className="col-6 p-r-0">
                  <select className="form-control" size={1}>
                    {SelectMonth.map((months, i) =>
                      <option key={i}>{months}</option>
                    )}
                  </select>
                </FormGroup>
                <FormGroup className="col-6">
                  <select className="form-control" size={1}>
                    {SelectYear.map((years, i) =>
                      <option key={i}>{years}</option>
                    )}
                  </select>
                </FormGroup>
                <div className="col-12">
                  <Button color="primary" className="btn-block" onClick={() => optionComprobate()}>
                    {'Submit'}
                  </Button>
                </div>
              </Row>
            </CardBody>
          </Card>
        </ModalHeader>
      </Modal>
      {RenderComprobante[comprobante]}
    </>
  )
}
export default CobrarMesa