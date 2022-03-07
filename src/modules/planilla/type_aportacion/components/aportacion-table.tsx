import React, { useMemo, useState } from 'react';
import DataTable, { Direction } from 'react-data-table-component';
import { PaginationChangePage, PaginationChangeRowsPerPage } from 'react-data-table-component/dist/src/DataTable/types';
import { TypeAportacion } from '../dtos/type_aportacion.enitity'
import { Search, ChevronRight } from 'react-feather';
import { Input, Form, FormGroup, Row, Col, Button } from 'reactstrap';

declare type onQuerySearch = (querySearch: string | string[]) => void;

declare type onClick = (typeaportacion: TypeAportacion) => void;

interface IProps {
  data: TypeAportacion[]
  perPage?: number
  totalItems?: number
  loading?: boolean
  defaultQuerySearch?: string | string[]
  onChangePage?: PaginationChangePage
  onChangeRowsPerPage?: PaginationChangeRowsPerPage,
  onQuerySearch?: onQuerySearch,
  onClick?: onClick,
}

export const AportacionTable = ({
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
        selector: (row: TypeAportacion) => row.id
      },
      {
        name: "Descripción",
        selector: (row: TypeAportacion) => `${row?.name || ''}`.toUpperCase()
      },
      {
        name: "Porcentaje%",
        selector: (row: TypeAportacion) => `${row?.percent || ''}`.toUpperCase()
      },
      {
        name: "Mínimo",
        selector: (row: TypeAportacion) => `${row?.min || ''}`.toUpperCase()
      },
      {
        name: "Porcentaje%",
        selector: (row: TypeAportacion) => `${row?.default || ''}`.toUpperCase()
      },
      {
        name: "Estado",
        selector: (row: TypeAportacion) => (
          <span className={`badge badge-${row.state ? 'success' : 'danger'}`}>
            {row.state ? 'Activo' : 'Inactivo'}
          </span>
        )
      },
      {
        name: "Opción",
        selector: (row: TypeAportacion) => (
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

  const handleClick = (typeaportacion: TypeAportacion) => {
    if (typeof onClick == 'function') onClick(typeaportacion);
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