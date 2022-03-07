import React, { useMemo, useState } from 'react';
import DataTable, { Direction } from 'react-data-table-component';
import { PaginationChangePage, PaginationChangeRowsPerPage } from 'react-data-table-component/dist/src/DataTable/types';
import { TypeSindicato } from '../dtos/type_sindicato.entity';
import { Search, ChevronRight } from 'react-feather';
import { Input, Form, FormGroup, Row, Col, Button } from 'reactstrap';

declare type onQuerySearch = (querySearch: string | string[]) => void;
declare type onClick = (typeremuneration: TypeSindicato) => void;

interface IProps {
  data: TypeSindicato[]
  perPage?: number
  totalItems?: number
  loading?: boolean
  defaultQuerySearch?: string | string[]
  onChangePage?: PaginationChangePage
  onChangeRowsPerPage?: PaginationChangeRowsPerPage,
  onQuerySearch?: onQuerySearch,
  onClick?: onClick,
}

export const SindicatoTable = ({
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
        selector: (row: TypeSindicato) => row.id
      },
      {
        name: "Descripción",
        selector: (row: TypeSindicato) => `${row?.nombre || ''}`.toUpperCase()
      },
      {
        name: "Ext Presupuestal",
        selector: (row: TypeSindicato) => `${row?.porcentaje || ''}`.toUpperCase()
      },
      {
        name: "Edicion",
        selector: (row: TypeSindicato) => (
          <span className={`badge badge-${row.estado ? 'success' : 'danger'}`}>
            {row.estado ? 'Activo' : 'Inactivo'}
          </span>
        )
      },
      {
        name: "Estado",
        selector: (row: TypeSindicato) => (
          <span className={`badge badge-${row.estado ? 'success' : 'danger'}`}>
            {row.estado ? 'Activo' : 'Inactivo'}
          </span>
        )
      },
      {
        name: "Opción",
        selector: (row: TypeSindicato) => (
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

  const handleClick = (typesindicato: TypeSindicato) => {
    if (typeof onClick == 'function') onClick(typesindicato);
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