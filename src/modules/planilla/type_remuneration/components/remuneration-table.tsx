import React, { useMemo, useState } from 'react';
import DataTable, { Direction } from 'react-data-table-component';
import { PaginationChangePage, PaginationChangeRowsPerPage } from 'react-data-table-component/dist/src/DataTable/types';
import { TypeRemuneration } from '../dtos/type_remuneration.entity';
import { Search, XCircle, Edit3 } from 'react-feather';
import { Input, Form, FormGroup, Row, Col, Button } from 'reactstrap';

// eslint-disable-next-line no-unused-vars
declare type onQuerySearch = (querySearch: string | string[]) => void;
// eslint-disable-next-line no-unused-vars
// declare type Acctions = (typeremuneration: TypeRemuneration) =>

interface IProps {
  data: TypeRemuneration[]
  perPage?: number
  totalItems?: number
  loading?: boolean
  defaultQuerySearch?: string | string[]
  onChangePage?: PaginationChangePage
  onChangeRowsPerPage?: PaginationChangeRowsPerPage,
  onQuerySearch?: onQuerySearch,
  onClick?: {
    show: (typeremuneration: TypeRemuneration) => void,
    desactive: (typeremuneration: TypeRemuneration) => void
  }
}

export const RemunerationTable = ({
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
        selector: (row: TypeRemuneration) => row.id
      },
      {
        name: "Descripción",
        selector: (row: TypeRemuneration) => `${row?.description || ''}`.toUpperCase()
      },
      {
        name: "Edicion",
        selector: (row: TypeRemuneration) => (
          <span className={`badge badge-${row.isEdit ? 'dark' : 'danger'}`}>
            {row.isEdit ? 'Habilitado' : 'Inhabilitado'}
          </span>
        )
      },
      {
        name: "Estado",
        selector: (row: TypeRemuneration) => (
          <span className={`badge badge-${row.state ? 'success' : 'danger'}`}>
            {row.state ? 'Activo' : 'Inactivo'}
          </span>
        )
      },
      {
        name: "Opción",
        selector: (row: TypeRemuneration) => (
          <>
            <Edit3 className="cursor-pointer"
              onClick={() => onClick?.show(row)}
            />
            <XCircle className="cursor-pointer " style={{ marginLeft: '6px' }}
              onClick={() => onClick?.desactive(row)}
            />
          </>

        )


      }

    ]
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
        highlightOnHover
      />
    </>
  )
}