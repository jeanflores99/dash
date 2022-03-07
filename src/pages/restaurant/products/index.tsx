import React, { useState } from 'react'
import { AuthLayout } from '@common/layouts'
import { BreadCrumb } from '@common/breadcrumb'
import { FloatButton } from '@common/button/float-button'
import { Plus } from 'react-feather'
import { CreateProduct } from '@modules/restaurant/products/create-product'
import TableProducts from '@modules/restaurant/products/table-products'

const Index = () => {
  const [option, setOption] = useState('UNDEFINED')
  const switchRender: any = {
    CREATE: <CreateProduct
      onClose={() => setOption('UNDEFINED')}
    />,
    UNDEFINED: undefined
  }
  return (
    <AuthLayout>
      <BreadCrumb title='Productos' parent='Control de Ventas' />
      <div className='card card-body'>
        <TableProducts />
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
