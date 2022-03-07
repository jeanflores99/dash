import React from "react";
import { Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import Link from 'next/link'
import { Home } from 'react-feather';

interface IProps {
  title?: string
  parent?: string
}

export const BreadCrumb = ({ title, parent }: IProps) => {
  return (
    <div className="page-title">
      <Row>
        <Col>
          <h3>{title || ''}</h3>
        </Col>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href={'/'}>
                <a>
                  <Home style={{ color: '#2c323f' }}/>
                </a>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{parent}</BreadcrumbItem>
            <BreadcrumbItem active>{title}</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
    </div>
  )
}