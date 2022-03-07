import React, { useState, useMemo } from 'react'
import { Input, Form, FormGroup, Row, Col, Button } from 'reactstrap';
import { Search, ChevronRight, Edit3, XCircle } from 'react-feather'
import DataTable from 'react-data-table-component';
import { Products } from '@common/products/dtos/products'
import { Iproduct } from '@common/products/interfaces/IProduct'
// import { TypeProduct } from '@common/products/interfaces/ITypeProduc'


const TableProducts = () => {
  const columns = useMemo(() => {
    return [
      {
        name: "#ID",
        selector: (row: Iproduct) => row.id
      },
      {
        name: "Nombre",
        selector: (row: Iproduct) => `${row?.name || ''}`
      },
      {
        name: "Cantidad",
        selector: (row: Iproduct) => (
          <span className='badge badge-dark'>{row?.count || ''}</span>

        )
      },
      {
        name: "Precio",
        selector: (row: Iproduct) => (
          <span className='badge badge-dark'>S/{row?.precio}</span>
        )
      },
      {
        name: "Estado",
        selector: (row: Iproduct) => (
          <span className={`badge badge-${row?.state ? 'success' : 'danger'}`}>{row?.state ? 'Activo' : 'Inactivo'}</span>
        )
      }, {
        name: "Estado",
        selector: (row: Iproduct) => (
          <span className={`badge badge-info`}>{row?.typeProduc}</span>
        )
      },
      {
        name: "Opción",
        selector: (row: Iproduct) => (
          <>
            <Edit3 className="cursor-pointer"
            // onClick={() => show(row)}
            />
            {/* <XCircle className="cursor-pointer " style={{ marginLeft: '6px' }}
              onClick={() => { }}
            /> */}
          </>
        )
      }
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Products])

  return (
    <>
      <Form >
        <FormGroup className='mb-3'>
          <Row>
            <Col md="10 col-9" className='mb-2'>
              <Input
              // value={querySearch}
              // onChange={({ target }) => setQuerySearch(target.value)}
              // disabled={loading}
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
        data={Products}
        columns={columns as any}
      />
    </>
  )
}
export default TableProducts
