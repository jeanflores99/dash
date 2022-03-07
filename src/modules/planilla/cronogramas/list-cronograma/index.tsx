import React from 'react';
import Header from './header'
import { Buscar } from './buscar';
import { Tabla } from './table'
import { Card, CardBody, CardTitle } from 'reactstrap';
export const ListCronograma = () => {


  return (
    <>

      <Header />

      <Card>
        <CardBody >
          <CardTitle tag="h5">

            <Buscar />
          </CardTitle>
          {/* <CardText> */}
          <Tabla />
          {/* </CardText> */}
        </CardBody>


      </Card>
    </>
  )

}
