import React from "react";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
export const BreadCrumb = ({ }) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <a href="/" data-bs-original-title="" title="" >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" style={{ color: '#2c323f' }} height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </a>
      </BreadcrumbItem>
      <BreadcrumbItem>Planilla</BreadcrumbItem>
      <BreadcrumbItem active>Cronograma</BreadcrumbItem>
    </Breadcrumb>

  )
}