import React from 'react';
import { Card, Col, Nav, NavItem, NavLink, Row, FormGroup, Button } from 'reactstrap';
import { Target, File, Folder, PlusSquare } from 'react-feather';

interface IPropsItem {
  active: boolean
  Icon: any
  title: string
}

const ItemTab = ({ active, Icon, title }: IPropsItem) => {
  return (
    <NavItem className='cursor-pointer'>
      <NavLink
        className={active ? 'active' : ''}
      >
        <Icon /> {title}
      </NavLink>
    </NavItem>
  )
}

export const CategoriaTab = () => {
  return (
    <div className='project-list'>
      <Card>
        <Row>
          <Col md="6">
            <Nav tabs className="border-tab">
              <ItemTab
                title='General'
                Icon={Target}
                active={true}
              />
              <ItemTab
                title='Contratos'
                Icon={File}
                active={false}
              />
              <ItemTab
                title='Archivos'
                Icon={Folder}
                active={false}
              />
            </Nav>
          </Col>
          <Col sm="6">
            <div className="text-right">
              <FormGroup className="mb-0 mr-0"></FormGroup>
              <Button color='primary'>
                <PlusSquare /> Crear Nueva Categoria
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}