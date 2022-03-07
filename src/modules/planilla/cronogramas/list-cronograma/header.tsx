import React from "react";
import { Row, Col } from 'reactstrap'
import { BreadCrumb } from "./breadcrumb";
const Header = () => {
  return (
    <div className="page-title">
      <Row>
        <Col>
          <h3>
            Cronograma
          </h3>
        </Col>
        <Col>
          <BreadCrumb />
        </Col>


      </Row>
    </div>
  )

}
export default Header