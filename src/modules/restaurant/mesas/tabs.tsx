import React, { useState } from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import CreatePedido from './createPedido'
import { Products } from '@common/products/dtos/products'
const Tabs = () => {

  const [BasicLineTab, setBasicLineTab] = useState('1')
  const [option, setOption] = useState('UNDEFINED')
  const [currentProduct, setCurrentProduc] = useState({})
  const RenderSwitch: any = {
    UNDEFINED: undefined,
    CREATE: <CreatePedido
      onClose={() => setOption('UNDEFINED')}
      Current={currentProduct}
    />
  }
  return (<>
    <Nav tabs className="nav border-tab nav-primary">
      <NavItem id="mycd Tab" role="tablist">
        <NavLink tag="a" className={BasicLineTab === '1' ? 'active' : ''} onClick={() => setBasicLineTab('1')}>
          <i className="icofont icofont-fork-and-knife" />
        </NavLink>
      </NavItem>
      <NavItem id="myTab" role="tablist">
        <NavLink tag="a" className={BasicLineTab === '2' ? 'active' : ''} onClick={() => setBasicLineTab('2')}>
          <i className="icofont icofont-coffee-cup" />
        </NavLink>
      </NavItem>
      <NavItem id="myTab" role="tablist">
        <NavLink tag="a" className={BasicLineTab === '3' ? 'active' : ''} onClick={() => setBasicLineTab('3')}>
          <i className="icofont icofont-favourite" />
        </NavLink>
      </NavItem>
    </Nav>
    <span className='badge badge-info mb-1'>Nuestra carta</span>
    <TabContent activeTab={BasicLineTab} className=''>
      <TabPane tabId="1">
        <Row>
          {Products && BasicLineTab === '1' && Products.map((obj, index) => obj.typeProduc === 'Comida' ? (
            <div
              onClick={() => { setOption('CREATE'), setCurrentProduc(obj) }}
              key={index} className='col col-md-6 p-3'
              style={{ backgroundColor: '#F0F8FF', cursor: 'pointer' }}>
              {obj.name}
              <label className='badge badge-info ml-2'>S/{obj.precio}</label>


            </div>
          ) : null)}
        </Row>
      </TabPane>
      <TabPane tabId="2">
        <Row>
          {Products && BasicLineTab === '2' && Products.map((obj, index) => obj.typeProduc === 'Bebida' ? (
            < div key={index}
              onClick={() => { setOption('CREATE'), setCurrentProduc(obj) }}

              className='col col-md-6 p-3' style={{ backgroundColor: '#F0F8FF', cursor: 'pointer' }}>
              {obj.name}
              <label className='badge badge-info ml-2'>S/{obj.precio}</label>
            </div>
          ) : null)}
        </Row>
      </TabPane>
      <TabPane tabId="3">
        <Row>
          {Products && BasicLineTab === '3' && Products.map((obj, index) => obj.typeProduc === 'Extras' ? (
            <div key={index}
              onClick={() => { setOption('CREATE'), setCurrentProduc(obj) }}

              className='col col-md-6 p-3' style={{ backgroundColor: ' #F0F8FF', cursor: 'pointer' }}>
              {obj.name}
              <label className='badge badge-info ml-2'>S/{obj.precio}</label>
            </div>
          ) : null)}
        </Row>
      </TabPane>
    </TabContent>
    {
      RenderSwitch[option]
    }
  </>)
}
export default Tabs
