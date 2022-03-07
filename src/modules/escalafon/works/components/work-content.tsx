import React from 'react';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { WorkInfo } from './work-info';
import { Flag, ExternalLink } from 'react-feather';

export const WorkContent = () => {

  return (
    <Row>
      <Col md="8">
        <WorkInfo/>
      </Col>
      <Col md="4">
        <Card>
          <CardHeader>
            <h6><Flag className='icon'/> Consultas</h6>
          </CardHeader>
          <CardBody>
            <div className='mb-2'>
              <a href="https://servicios.sbs.gob.pe/ReporteSituacionPrevisional/Afil_Consulta.aspx"
                target="_blank" rel="noreferrer"
              >
                Consulta AFP <ExternalLink className='icon' />
              </a>
            </div>
            <div className='mb-2'>
              <a href="http://ww4.essalud.gob.pe:7777/acredita/"
                target="_blank" rel="noreferrer"
              >
                Consulta Essalud <ExternalLink className='icon' />
              </a>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}