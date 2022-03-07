import React, { useState } from 'react'
import { AuthLayout } from '@common/layouts'
import { BreadCrumb } from '@common/breadcrumb'
import ClientsTable from '@modules/restaurant/clientes/clientsTable'
import { FloatButton } from '@common/button/float-button'
import { Plus } from 'react-feather'
import ClientCreate from '@modules/restaurant/clientes/clientCreate'
const Index = () => {
  const [option, setOption] = useState('UNDEFINED')
  const switchRender: any = {
    CREATE: <ClientCreate
      onClose={() => setOption('UNDEFINED')}
    />,
    UNDEFINED: undefined
  }
  return (
    <AuthLayout>
      <BreadCrumb title='Clientes' parent='Control de Ventas' />
      <div className='card card-body'>
        <ClientsTable />
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
