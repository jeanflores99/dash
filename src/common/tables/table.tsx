import React, { useMemo } from 'react'
import DataTable from 'react-data-table-component'
import { IMesaDetails } from './interface/mesaDetails'
import { Edit3, XCircle } from 'react-feather'

interface Iprops {
  data: IMesaDetails[]
}

const TableDetails = ({ data }: Iprops) => {

  const columns = useMemo(() => {
    return [
      {
        name: "#ID",
        selector: (row: IMesaDetails) => row.id,

      },
      {
        name: "Nombre",
        selector: (row: IMesaDetails) => row.name,
      },
      {
        name: "Precio",
        selector: (row: IMesaDetails) => row.price,
        sortable: true

      },
      {
        name: "Cantidad",
        selector: (row: IMesaDetails) => row.count,
        sortable: true

      },
      {
        name: "SubTotal",
        selector: (row: IMesaDetails) => row.pricetotal,
        sortable: true

      },
      {
        name: 'Opción',
        selector: () => (
          <>
            <Edit3 className="cursor-pointer" color='purple'
            // onClick={() => onClick?.show(row)}
            />
            <XCircle className="cursor-pointer " style={{ marginLeft: '6px' }} color='red'
            // onClick={() => onClick?.desactive(row)}
            />
          </>
        )
      }
      // {
      //   name: "Opción",
      //   selector: (row: TypeRemuneration) => (
      //     <>
      //       <Edit3 className="cursor-pointer"
      //         onClick={() => onClick?.show(row)}
      //       />
      //       <XCircle className="cursor-pointer " style={{ marginLeft: '6px' }}
      //         onClick={() => onClick?.desactive(row)}
      //       />
      //     </>

      //   )


      // }

    ]
  }, [data])

  return (
    <>
      {/* <h5>Pedidos registados </h5> */}
      <span className='badge badge-info mb-1'>Pedidos registrados</span>
      <DataTable
        data={data}
        columns={columns as any}
        highlightOnHover
      />
    </>
  )
}

export default TableDetails