import React, { useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Info, Clipboard, Edit } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Show } from '@common/show';
import { DateTime } from 'luxon';
import { WorkEdit } from './work-edit';
import { PersonEdit } from '@modules/auth/person/components/person-edit';
import { personActions } from '@modules/auth/person/store';
import { workActions } from '../store';
import { PersonEntity } from '@modules/auth/person/dtos/person.entity';

export const WorkInfo = () => {

  const dispatch = useDispatch();
  const { work } = useSelector((state: RootState) => state.work);

  const [option, setOption] = useState<string | undefined>(undefined);
  
  const switchOptions = {
    EDIT_PERSON: "EDIT_PERSON",
    EDIT_WORK: "EDIT_WORK"
  }

  const isWork = useMemo(() => {
    return Object.keys(work || {}).length > 0;
  }, [work])

  const displayDateOfAdmission = useMemo(() => {
    if (!work?.dateOfAdmission) return 'N/A';
    return DateTime.fromSQL(`${work?.dateOfAdmission}`).toFormat('dd/MM/yyyy');
  }, [work]);

  const displayAffiliationOfDate = useMemo(() => {
    if (!work?.affiliationOfDate) return 'N/A';
    return DateTime.fromSQL(`${work?.affiliationOfDate}`).toFormat('dd/MM/yyyy');
  }, [work]);

  const displayDateOfBirth = useMemo(() => {
    if (!work?.person?.dateOfBirth) return 'N/A';
    return DateTime.fromSQL(`${work?.person?.dateOfBirth}`).toFormat('dd/MM/yyyy');
  }, [work]);

  const displayPlaceBirthDate = useMemo(() => {
    const departament = work?.person?.badge?.departament || 'N/A';
    const province = work?.person?.badge?.province || 'N/A';
    const district = work?.person?.badge?.district || 'N/A';
    return `${departament} / ${province} / ${district}`
  }, [work])

  const handleEditPerson = () => {
    dispatch(personActions.setPerson(work?.person as any));
    setOption(switchOptions.EDIT_PERSON);
  }

  const onSaveEditPerson = (person: PersonEntity) => {
    const newWork = JSON.parse(JSON.stringify(work || {}));
    newWork.person = person;
    dispatch(workActions.find(newWork));
  }

  return (
    <>
      <Card>
        <CardHeader>
          <h6>
            <Info className='icon' /> Información Básica
            <Show condition={isWork}>
              <span className='close cursor-pointer'>
                <Edit className='icon'
                  onClick={handleEditPerson}
                />
              </span>
            </Show>
          </h6>
        </CardHeader>
        <CardBody>
          <Show condition={isWork}>
            <Row>
              <Col md="6" className='mb-3'>
                <label>Prefijo</label>
                <h6 className='capitalize'>{work?.person?.prefix || 'N/A'}</h6>
              </Col>
              <Col md="6" className='mb-3'>
                <label>Nombre Completo</label>
                <h6 className='uppercase'>{work?.person?.fullName || ''}</h6>
              </Col>
              <Col md="6" className='mb-3 capitalize'>
                <label>Tipo de Documento</label>
                <h6>{work?.person?.documentType?.name || 'N/A'}</h6>
              </Col>
              <Col md="6" className='mb-3'>
                <label>N° Documento</label>
                <h6>{work?.person?.documentNumber || 'N/A'}</h6>
              </Col>
              <Col md="6" className='mb-3'>
                <label>Sexo</label>
                <h6>{work?.person?.gender == 'M' ? 'Hombre' : 'Mujer'}</h6>
              </Col>
              <Col md="6" className='mb-3'>
                <label>Fecha de Nacimiento</label>
                <h6>{displayDateOfBirth}</h6>
              </Col>
              <Col md="12" className='mb-3'>
                <label>Lugar de Nacimiento</label>
                <h6 className='capitalize'>{displayPlaceBirthDate}</h6>
              </Col>
              <Col md="6" className='mb-3'>
                <label>N° Teléfono</label>
                <h6>{work?.person?.phone || 'N/A'}</h6>
              </Col>
              <Col md="6" className='mb-3'>
                <label>Correo</label>
                <h6>{work?.person?.emailContact || 'N/A'}</h6>
              </Col>
              <Col md="12" className='mb-3'>
                <label>Dirección</label>
                <h6>{work?.person?.address || 'N/A'}</h6>
              </Col>

              {/* información como trabajador */}
              <Col md="12" className='mb-1 mt-3'>
                <hr />
                <h6>
                  <Clipboard className='icon' /> Datos del trabajador
                  <Show condition={isWork}>
                    <span className='close cursor-pointer'>
                      <Edit className='icon'
                        onClick={() => setOption(switchOptions.EDIT_WORK)}
                      />
                    </span>
                  </Show>
                </h6>
                <hr />
              </Col>
              <Col md="6" className='mb-3'>
                <label>Fecha de Ingreso</label>
                <h6>{displayDateOfAdmission}</h6>
              </Col>
              <Col md="6" className='mb-3'>
                <label>N° Essalud</label>
                <h6>{work?.numberOfEssalud || 'N/A'}</h6>
              </Col>
              <Col md="6" className='mb-3'>
                <label>Ley Social</label>
                <h6 className='capitalize'>
                  {work?.afp?.name || 'N/A'} {work?.afp?.isPrivate ? `- ${work.afp?.typeAfp}` : ''}
                </h6>
              </Col>
              <Col md="6" className='mb-3'>
                <label>N° CUSSP</label>
                <h6>{work?.numberOfCussp || 'N/A'}</h6>
              </Col>
              <Col md="6" className='mb-3'>
                <label>Fecha de Affiliación</label>
                <h6>{displayAffiliationOfDate}</h6>
              </Col>
              <Col md="6" className='mb-3'>
                <label>Prima de seguros</label>
                <h6 className='capitalize'>{work?.isPrimaSeguro ? 'SI' : 'NO'}</h6>
              </Col>
            </Row>
          </Show>
        </CardBody>
      </Card>
      {/* editar person */}
      <PersonEdit
        isOpen={switchOptions.EDIT_PERSON == option}
        onClose={() => setOption(undefined)}
        onSave={onSaveEditPerson}
      />
      {/* editar work */}
      <WorkEdit
        isOpen={switchOptions.EDIT_WORK == option}
        onClose={() => setOption(undefined)}
      />
    </>
  )
}