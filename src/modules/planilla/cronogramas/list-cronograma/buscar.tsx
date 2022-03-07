import React from 'react'
import { Form, Row, Input, Col, Button } from 'reactstrap'
export const Buscar = () => {
  return (
    <Form>
      <Row form>
        <Col md={2} sm={6}>
          <Input />

        </Col>
        <Col md={2} sm={6}>
          <Input />
        </Col>
        <Col md={2} sm={6}>
          <Button color="primary" block>
            Buscar
          </Button>
        </Col>
        <Col md={2} sm={6}>
          <Button color='warning' block>
            Exportar
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
