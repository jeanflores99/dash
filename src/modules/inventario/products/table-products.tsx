import React, { useState, useMemo } from 'react'
import { Input, Form, FormGroup, Row, Col, Button } from 'reactstrap';
import { Search, ChevronRight, Edit3, XCircle } from 'react-feather'
import DataTable from 'react-data-table-component';
import { Item } from './dtos/items'
import { Iitem } from './interfaces/Iitem'

interface Iprops {
  show: (Item: Iitem) => void
}

const TableProducts = ({ show }: Iprops) => {


  const columns = useMemo(() => {
    return [
      {
        name: "#ID",
        selector: (row: Iitem) => row.id
      },
      {
        name: "Nombre",
        selector: (row: Iitem) => `${row?.nombre || ''}`
      },
      {
        name: "Cantidad",
        selector: (row: Iitem) => `${row?.count || ''}`
      },
      {
        name: "Precio",
        selector: (row: Iitem) => (
          <span className='badge badge-dark'>S/{row?.priceunitario}</span>
        )
      },
      {
        name: "Total",
        selector: (row: Iitem) => (
          <span className='badge badge-warning'>S/{row?.pricetotal} </span>
        )
      }, {
        name: "Estado",
        selector: (row: Iitem) => (
          <span className={`badge badge-${row?.state ? 'success' : 'danger'}`}>{row?.state ? 'Activo' : 'Inactivo'}</span>)
      },
      {
        name: "Opción",
        selector: (row: Iitem) => (
          <>
            <Edit3 className="cursor-pointer"
              onClick={() => show(row)}
            />
            {/* <XCircle className="cursor-pointer " style={{ marginLeft: '6px' }}
              onClick={() => { }}
            /> */}
          </>
        )
      }
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Item])



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
        data={Item}
        columns={columns as any}
      />
    </>
  )
}
export default TableProducts