import React from 'react'
import { AuthLayout } from '@common/layouts'
import { BreadCrumb } from '@common/breadcrumb'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
// import ApexCharts from 'react-apexcharts'
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
// import { Currentlysale, Marketvalue } from './chartsData/apex-charts-data'
import { Currentlysale } from '@common/reports/apex-charts-data'
const Index = () => {
  return (
    <AuthLayout>
      <BreadCrumb title='Reportes' parent='Control de Ventas' />
      <Container fluid={true}>
        <Row className="second-chart-list third-news-update">
          <Col xl="12 xl-100" className="dashboard-sec box-col-12">
            <Card className="earning-card">
              <Row className="m-0 p-4">
                {/* <Col xl="3" className="earning-content p-0">
                  <Row className="m-0 chart-left">
                    <Col xl="12" className="p-0 left_side_earning">
                      <h5>Panel</h5>
                      <p className="font-roboto">{"Overview of last month"}</p>
                    </Col>
                    <Col xl="12" className="p-0 left_side_earning">
                      <h5>{"$4055.56"} </h5>
                      <p className="font-roboto">{"This Month Earning"}</p>
                    </Col>
                    <Col xl="12" className="p-0 left_side_earning">
                      <h5>{"$1004.11"}</h5>
                      <p className="font-roboto">{"This Month Profit"}</p>
                    </Col>
                    <Col xl="12" className="p-0 left_side_earning">
                      <h5>{"90%"}</h5>
                      <p className="font-roboto">{"This Month Sale"}</p>
                    </Col>
                    <Col xl="12" className="p-0 left-btn"><a className="btn btn-gradient" href="#javascript">Resumen</a></Col>
                  </Row>
                </Col> */}
                <Col xl="12" className="p-0">
                  <div className="chart-right">
                    <Row className="m-0 p-tb">
                      <Col xl="8" md="8" sm="8" className="col-12 p-0">
                        <div className="inner-top-left">
                          <ul className="d-flex list-unstyled">
                            <li>{'Reporte Mensual'}</li>
                            <li className="active">{''}</li>
                            <li>{''}</li>
                            <li>{''}</li>
                          </ul>
                        </div>
                      </Col>
                      <Col xl="4" md="4" sm="4" className="col-12 p-0 justify-content-end">
                        <div className="inner-top-right">
                          <ul className="d-flex list-unstyled justify-content-end">
                            <li>{''}</li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xl="12">
                        <CardBody className="p-0">
                          <div className="current-sale-container">
                            <div id='chart'>
                              <ApexCharts options={Currentlysale.options as any} series={Currentlysale.series} type='area' height={240} />

                            </div>
                          </div>
                        </CardBody>
                      </Col>
                    </Row>
                  </div>
                  <Row className="border-top m-0">
                    <Col xl="4" md="6" sm="6" className="pl-0">
                      <div className="media p-0">
                        <div className="media-left"><i className="icofont icofont-crown"></i></div>
                        <div className="media-body">
                          <h6>{'Venta Total'}</h6>
                          <p>{"S/140,240.00"}</p>
                        </div>
                      </div>
                    </Col>
                    <Col xl="4" md="6" sm="6">
                      <div className="media p-0">
                        <div className="media-left bg-secondary"><i className="icofont icofont-home"></i></div>
                        <div className="media-body">
                          <h6>{'Venta Local'}</h6>
                          <p>{"S/120,348.20"}</p>
                        </div>
                      </div>
                    </Col>
                    <Col xl="4" md="12" className="pr-0">
                      <div className="media p-0">
                        <div className="media-left"><i className="icofont icofont-cur-dollar"></i></div>
                        <div className="media-body">
                          <h6>{'Venta Delivery'}</h6>
                          <p>{"S/19,980.20"}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>

        </Row>
      </Container>
    </AuthLayout>
  )
}
export default Index
