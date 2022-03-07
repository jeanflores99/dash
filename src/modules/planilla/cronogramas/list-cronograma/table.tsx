import React, { Fragment } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import DataTable from 'react-data-table-component'
const tableColumns = [
  {
    id: '1',
    name: 'ID',
    selector: 'id',
    sortable: true,
    center: true,
  },
  {
    id: '2',
    name: 'Name',
    selector: 'name',
    sortable: true,
    center: true,
  },
  {
    id: '3',
    name: 'Price',
    selector: 'price',
    sortable: true,
    center: true,
  },
  {
    id: '4',
    name: 'Opciones',
    selector: 'opciones',
    sortable: true,
    center: true,
  },
]
const data = [
  {
    id: "1",
    name: "Product Menu",
    price: "S/12.00",
    opciones: [<i className="fa fa-info font-info f-12 ml-2" key={1} />, <i className="fa fa-share font-info f-12 ml-2" key={2} />, <i className="fa fa-file font-info f-12 ml-2" key={3} />],
  },
  {
    id: "2",
    name: "Product Menu",
    price: "S/12.00",
    opciones: [<i className="fa fa-info font-info f-12 ml-2" key={1} />, <i className="fa fa-share font-info f-12 ml-2" key={2} />, <i className="fa fa-file font-info f-12 ml-2" key={3} />],
  },
  {
    id: "3",
    name: "Product Menu",
    price: "S/12.00",
    opciones: [<i className="fa fa-info font-info f-12 ml-2" key={1} />, <i className="fa fa-share font-info f-12 ml-2" key={2} />, <i className="fa fa-file font-info f-12 ml-2" key={3} />],
  },
  {
    id: "4",
    name: "Product Menu",
    price: "S/12.00",
    opciones: [<i className="fa fa-info font-info f-12 ml-2" key={1} />, <i className="fa fa-share font-info f-12 ml-2" key={2} />, <i className="fa fa-file font-info f-12 ml-2" key={3} />],
  },

]

export const Tabla = () => {
  return (
    <Fragment >

      <DataTable
        // key={'1'}
        title="Cronogramas"
        data={data}
        columns={[]}
        striped={true}
        // center={true}
        selectableRows
      // defaultSortField='1'
      // persistTableHead
      // contextActions={contextActions}
      // onSelectedRowsChange={handleRowSelected}
      // clearSelectedRows={toggleCleared}
      />
      <div className='d-flex justify-content-center mt-2'>
        <Pagination >
          <PaginationItem>
            <PaginationLink
              first
              href="#"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              previous
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              4
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              5
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              next
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              last
            />
          </PaginationItem>
        </Pagination>
      </div>
    </Fragment >
  )
}
