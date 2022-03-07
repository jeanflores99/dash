import React, { useState } from 'react'
import { AuthLayout } from '@common/layouts'
import { BreadCrumb } from '@common/breadcrumb'
import ClientsTable from '@modules/restaurant/clientes/clientsTable'
import { FloatButton } from '@common/button/float-button'
import { Plus } from 'react-feather'
import ClientCreate from '@modules/restaurant/clientes/clientCreate'
import ClientEdit from '@modules/restaurant/clientes/client-Edit'
import { IClientes } from '@common/tables/interface/client'

const Index = () => {
  const [option, setOption] = useState('UNDEFINED')
  const [currentClient, setCurrentClinet] = useState<IClientes>({})
  const switchRender: any = {
    CREATE: <ClientCreate
      onClose={() => setOption('UNDEFINED')}
    />,
    EDIT: <ClientEdit
      data={currentClient}
      onClose={() => setOption('UNDEFINED')}
    />,
    UNDEFINED: undefined
  }

  const show = (client: IClientes) => {
    setCurrentClinet(client)
    setOption('EDIT')
    // console.table(client)
  }
  return (
    <AuthLayout>
      <BreadCrumb title='Clientes' parent='Control de Ventas' />
      <div className='card card-body'>
        <ClientsTable
          onClick={show}

        />
      </div>


      <FloatButton
        icon={<Plus />}
        color='success'
        onClick={() => setOption('CREATE')}
      />

      {switchRender[option]}
    </AuthLayout>
  )
}
export default Index
