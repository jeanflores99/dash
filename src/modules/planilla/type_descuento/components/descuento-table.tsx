import React, { useMemo, useState } from 'react';
import DataTable, { Direction } from 'react-data-table-component';
import { PaginationChangePage, PaginationChangeRowsPerPage } from 'react-data-table-component/dist/src/DataTable/types';
import { TypeDescuento } from '../dtos/type_descuento.enitity'
import { Search, ChevronRight } from 'react-feather';
import { Input, Form, FormGroup, Row, Col, Button } from 'reactstrap';

// eslint-disable-next-line no-unused-vars
declare type onQuerySearch = (querySearch: string | string[]) => void;
// eslint-disable-next-line no-unused-vars
declare type onClick = (typedescuento: TypeDescuento) => void;

interface IProps {
  data: TypeDescuento[]
  perPage?: number
  totalItems?: number
  loading?: boolean
  defaultQuerySearch?: string | string[]
  onChangePage?: PaginationChangePage
  onChangeRowsPerPage?: PaginationChangeRowsPerPage,
  onQuerySearch?: onQuerySearch,
  onClick?: onClick,
}

export const DescuentoTable = ({
  data, perPage, totalItems, loading,
  defaultQuerySearch, onQuerySearch,
  onChangePage, onChangeRowsPerPage,
  onClick
}: IProps) => {

  const [querySearch, setQuerySearch] = useState<string | string[]>(defaultQuerySearch || '');
  const columns = useMemo(() => {
    return [
      {
        name: "#ID",
        selector: (row: TypeDescuento) => row.id
      },
      {
        name: "Descripción",
        selector: (row: TypeDescuento) => `${row?.description || ''}`.toUpperCase()
      },
      {
        name: "Edicion",
        selector: (row: TypeDescuento) => (
          <span className={`badge badge-${row.isEdit ? 'dark' : 'danger'}`}>
            {row.isEdit ? 'Habilitado' : 'DesHabilitado'}
          </span>
        )
      },
      {
        name: "Estado",
        selector: (row: TypeDescuento) => (
          <span className={`badge badge-${row.state ? 'success' : 'danger'}`}>
            {row.state ? 'Activo' : 'Inactivo'}
          </span>
        )
      },
      {
        name: "Opción",
        selector: (row: TypeDescuento) => (
          <ChevronRight className="cursor-pointer"
            onClick={() => handleClick(row)}
          />
        )
      }
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  function handleSearch() {
    if (typeof onQuerySearch == 'function') {
      onQuerySearch(querySearch);
    }
  }

  const handleSearchBySubmit = (e: any) => {
    e.preventDefault();
    handleSearch();
  }

  const handleClick = (typedescuento: TypeDescuento) => {
    if (typeof onClick == 'function') onClick(typedescuento);
  }

  return (
    <>
      <Form onSubmit={handleSearchBySubmit}>
        <FormGroup className='mb-3'>
          <Row>
            <Col md="10 col-9" className='mb-2'>
              <Input value={querySearch}
                onChange={({ target }) => setQuerySearch(target.value)}
                disabled={loading}
              />
            </Col>
            <Col md="2 col-3" className='mb-2'>
              <Button color='primary'
                block
                disabled={loading}
                onClick={handleSearch}
              >
                <Search size={15} />
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
      <DataTable
        striped
        direction={Direction.AUTO}
        responsive
        columns={columns as any}
        progressPending={loading || false}
        data={data}
        pagination
        paginationPerPage={perPage || 30}
        paginationServer
        paginationTotalRows={totalItems || 30}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </>
  )
}