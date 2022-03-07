import React, { useMemo } from 'react';
import { Card, CardHeader, Row, Col, Media } from 'reactstrap';
import Background from './assets/bg1.jpg';
import ProfileImage from '@assets/images/perfil.jpg'
import { DateTime } from 'luxon'

interface IProps {
  email: string
  dateOfBirth: string
  title: string
  phone: string
  address: string
  children?: any
  code: string
}

export const PersonProfile = ({
  email, dateOfBirth, title,
  phone, address, children, code }: IProps) => {

  const displayDate = useMemo(() => {
    return DateTime.fromSQL(dateOfBirth).toFormat('dd LLL yyyy');
  }, [dateOfBirth]);

  return (
    <div className='user-profile'>
      <Card className="card hovercard text-center">
        <CardHeader className="cardheader"
          style={{ 
            background: `url(${Background.src})`,
            height: "350px"
          }}
        />
        <div className="user-image">
          <div className="avatar">
            <Media body
              src={ProfileImage.src}
              alt=""
              data-intro="This is Profile image"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="icon-wrapper" data-intro="Change Profile image here">
            <i className="icofont icofont-pencil-alt-5">
              <input className="upload" type="file"/>
            </i>
          </div>
        </div>
        <div className="info">
          <Row>
            <Col sm="6" lg="4" className="order-sm-1 order-xl-0">
              <Row>
                <Col md="6">
                  <div className="ttl-info text-left">
                    <h6>
                      <i className="fa fa-envelope mr-2"></i> Email</h6>
                      <span>{email}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="ttl-info text-left ttl-sm-mb-0">
                    <h6><i className="fa fa-calendar"></i> F. Nacimiento</h6>
                    <span>{displayDate}</span>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col sm="12" lg="4" className="order-sm-0 order-xl-1">
              <div className="user-designation">
                <div className="title">
                  <a target="_blank" href="#javascript">{title}</a>
                </div>
                <div className="desc mt-2">{code}</div>
              </div>
            </Col>
            <Col sm="6" lg="4" className="order-sm-2 order-xl-2">
              <Row>
                <Col md="6">
                  <div className="ttl-info text-left ttl-xs-mt">
                    <h6><i className="fa fa-phone"></i> Contacto</h6>
                    <span>{phone}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="ttl-info text-left ttl-sm-mb-0">
                    <h6><i className="fa fa-location-arrow"></i> Ubicación</h6>
                    <span>{address}</span>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          {children || null}
        </div>
      </Card>
    </div>
  )
}