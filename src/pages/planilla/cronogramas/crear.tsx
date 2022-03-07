import React from 'react'
import { connect } from 'react-redux'
import { AuthLayout } from '@common/layouts'

const Crear = () => {
  return (
    <AuthLayout>
      crear
    </AuthLayout>
  )
}
export default connect(state => state)(Crear)
