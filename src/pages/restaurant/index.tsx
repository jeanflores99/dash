import React from 'react'
import { AuthLayout } from '@common/layouts/'
import { BreadCrumb } from '@common/breadcrumb'
import { Mesas } from '@common/tables/mesa'
const Index = () => {
  return (
    <AuthLayout>
      <BreadCrumb title='Mesas' parent='Control de Ventas' />
      <div className='card card-body'>
        <Mesas />
      </div>
    </AuthLayout>
  )
}
export default Index
