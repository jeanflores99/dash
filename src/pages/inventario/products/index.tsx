import React, { useState } from 'react'
import { BreadCrumb } from '@common/breadcrumb'
import { AuthLayout } from '@common/layouts'
import { FloatButton } from '@common/button/float-button'
import { Plus } from 'react-feather'
import CreateRoduct from '@modules/inventario/products/create-product'
import TableProducts from '@modules/inventario/products/table-products'
import EditProduct from '@modules/inventario/products/edit-product'
import { Iitem } from '@modules/inventario/products/interfaces/Iitem'

const Index = () => {
  const [option, setOption] = useState('UNDEFINED')
  const [currentItem, setCurrentItem] = useState<Iitem>({})
  const switchRender: any = {
    UNDEFINED: undefined,
    EDIT: <EditProduct
      data={currentItem}
      onClose={() => setOption('UNDEFINED')}
    />,
    CREATE: <CreateRoduct
      onClose={() => setOption('UNDEFINED')}
    />
  }
  const show = (Item: Iitem) => {
    setCurrentItem(Item)
    setOption('EDIT')
  }
  return (
    <AuthLayout>
      <BreadCrumb title='Productos' parent='Inventario' />
      <div className='card card-body'>
        {/* <ClientsTable /> */}
        <TableProducts
          show={show}
        />
      </div>


      <FloatButton
        icon={<Plus />}
        color='success'
        onClick={() => setOption('CREATE')}
      />

      {switchRender[option]}
    </AuthLayout >
  )
}

export default Index