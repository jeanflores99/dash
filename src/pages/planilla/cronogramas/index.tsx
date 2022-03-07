import React from "react";
import { AuthLayout } from '@common/layouts'
import { connect } from 'react-redux'
import { ListCronograma } from '@modules/planilla/cronogramas'
import Btnflotante from "@modules/planilla/cronogramas/list-cronograma/btnflotante";

const Index = () => {
  return (
    <AuthLayout>
      <ListCronograma />
      <Btnflotante push="" />
    </AuthLayout>
  )
}
export default connect(state => state)(Index)
// export default connect(state => state)(Cronogramas)