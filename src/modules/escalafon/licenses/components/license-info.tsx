/* eslint-disable no-unused-vars */
import { plainToClass } from "class-transformer"
import { Edit } from "react-feather"
import { Col, Row } from "reactstrap"
import { ILicenseEntity } from "../dtos/license.entity"
import { LicenseSerialize } from "../serializers/license.serialize";

interface IProps {
  license: ILicenseEntity,
  onEdit: (license: ILicenseEntity) => void
}

export const LicenseInfo = ({ license, onEdit }: IProps) => {

  const licenseSerialize = plainToClass(LicenseSerialize, license);

  const handleLicense = () => {
    if (typeof onEdit == 'function') {
      onEdit(license);
    }
  }

  return (
    <div className="media mb-1">
      <Edit className="icon close"
        onClick={handleLicense}
      />
      <div className="media-body ml-3">
        <Row>
          <Col md="6" className="mb-1">
            <label>Tipo Licencia</label>
            <h6>{license?.typeLicense?.name || ""}</h6>
          </Col>

          <Col md="12" className="mb-1">
            <label>N° Documento</label>
            <h6>{license?.resolution || ""}</h6>
          </Col>
          
          <Col md="12" className="mb-1">
            <label>Fecha de Documento</label>
            <h6>{licenseSerialize?.displayDateOfResolution || ""}</h6>
          </Col>

          <Col md="6" className="mb-1">
            <label>Fecha de Inicio</label>
            <h6>{licenseSerialize?.displayDateOfAdmission || ""}</h6>
          </Col>

          <Col md="6" className="mb-1">
            <label>Fecha de Termino</label>
            <h6>{licenseSerialize?.displayTerminationDate || ""}</h6>
          </Col>

          <Col md="6" className="mb-1">
            <label>Días usados</label>
            <h6>{licenseSerialize.displayDaysUsed || 0}</h6>
          </Col>

          <Col md="6" className="mb-1">
            <label>Con gose de haber</label>
            <h6>{licenseSerialize.displayIsPay}</h6>
          </Col>

          <Col md="12" className="mb-1">
            <label>Descripción</label>
            <h6>{license?.description || "N/A"}</h6>
          </Col>
        </Row>
      </div>
    </div>
  )
}