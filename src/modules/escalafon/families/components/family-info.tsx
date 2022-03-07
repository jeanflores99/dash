/* eslint-disable no-unused-vars */
import { Card, CardBody, CardHeader, Col, Row, Badge, Button, CardFooter } from "reactstrap"
import { IFamilyEntity } from "../dtos/family.entity.dto"
import { plainToClass } from "class-transformer";
import { PersonSerialize } from "@modules/auth/person/serializes/person.serialize";
import { BadgeSerialize } from "@common/badges/serializes/badge.serialize";
import { FamilySerialize } from "../serializers/family.serialize";
import { Edit, Trash } from "react-feather";

interface IProps {
  family: IFamilyEntity,
  onEdit?: (family: IFamilyEntity) => void 
} 

export const FamilyInfo = ({ family, onEdit }: IProps) => {

  const person = plainToClass(PersonSerialize, family.person);
  const badge = plainToClass(BadgeSerialize, family?.person?.badge);
  const familySerialize = plainToClass(FamilySerialize, family);

  const handleFamily = () => {
    if (typeof onEdit == 'function') {
      onEdit(family);
    }
  }

  return (
    <Card>
      <CardHeader>
        <h6>
          <Badge color="info">{familySerialize.displayMode}</Badge>
          <Trash className="icon close cursor-pointer"/>
        </h6>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="6" className='mb-3'>
            <label>Prefijo</label>
            <h6 className='capitalize'>{family?.person?.prefix || 'N/A'}</h6>
          </Col>
          <Col md="6" className='mb-3'>
            <label>Nombre Completo</label>
            <h6 className='uppercase'>{family?.person?.fullName || ''}</h6>
          </Col>
          <Col md="6" className='mb-3 capitalize'>
            <label>Tipo de Documento</label>
            <h6>{family?.person?.documentType?.name || 'N/A'}</h6>
          </Col>
          <Col md="6" className='mb-3'>
            <label>N° Documento</label>
            <h6>{family?.person?.documentNumber || 'N/A'}</h6>
          </Col>
          <Col md="6" className='mb-3'>
            <label>Sexo</label>
            <h6>{family?.person?.gender == 'M' ? 'Hombre' : 'Mujer'}</h6>
          </Col>
          <Col md="6" className='mb-3'>
            <label>Fecha de Nacimiento</label>
            <h6>{person?.displayDateOfBirth || ''}</h6>
          </Col>
          <Col md="12" className='mb-3'>
            <label>Lugar de Nacimiento</label>
            <h6 className='capitalize'>{badge?.displayDescriptor || ''}</h6>
          </Col>
          <Col md="6" className='mb-3'>
            <label>N° Teléfono</label>
            <h6>{family?.person?.phone || 'N/A'}</h6>
          </Col>
          <Col md="6" className='mb-3'>
            <label>Correo</label>
            <h6>{family?.person?.emailContact || 'N/A'}</h6>
          </Col>
          <Col md="12" className='mb-3'>
            <label>Dirección</label>
            <h6>{family?.person?.address || 'N/A'}</h6>
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="text-right">
        <Button outline color="info"
          onClick={handleFamily}
        >
          <Edit className="icon"/>
        </Button>
      </CardFooter>
    </Card>
  )
}