import React, { useMemo } from 'react'
import { Input, Form, FormGroup, Row, Col, Button } from 'reactstrap';
import { Search, XCircle, Edit3 } from 'react-feather';
import { Clients } from '@common/tables/dto/clients'
import { IClientes } from '@common/tables/interface/client'
import DataTable from 'react-data-table-component';

interface Iprops {
  onClick: (client: IClientes) => void
}
const ClientsTable = ({ onClick }: Iprops) => {

  const columns = useMemo(() => {
    return [
      {
        name: "#ID",
        selector: (row: IClientes) => row.id
      },
      {
        name: "Nombres y Apellidos",
        selector: (row: IClientes) => `${row?.name || ''} ${row?.ape || ''}`
      },
      {
        name: "Visitas",
        selector: (row: IClientes) => `${row?.visitas || ''}`
      },
      // {
      //   name: "Estado",
      //   selector: (row: IClientes) => (
      //     <span className={`badge badge-${row.state ? 'success' : 'danger'}`}>
      //       {row.state ? 'Activo' : 'Inactivo'}
      //     </span>
      //   )
      // },
      {
        name: "Opción",
        selector: (row: IClientes) => (
          <>
            <Edit3 className="cursor-pointer"
              // onClick={() => onClick?.show(row)}
              onClick={() => onClick(row)}

            />
            <XCircle className="cursor-pointer " style={{ marginLeft: '6px' }}
              // onClick={() => onClick?.desactive(row)}
              onClick={() => { }}

            />
          </>

        )
      }

    ]
  }, [Clients])

  return (
    <>
      <Form >
        <FormGroup className='mb-3'>
          <Row>
            <Col md="10 col-9" className='mb-2'>
              <Input
                name='buscar'
              // 
              />
            </Col>
            <Col md="2 col-3" className='mb-2'>
              <Button color='primary'
                block
              >
                <Search size={15} />
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
      <DataTable
        striped
        responsive
        columns={columns as any}
        data={Clients}
        pagination
        paginationServer
        highlightOnHover
      />
    </>
  )
}
export default ClientsTable