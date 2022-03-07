import React, { useMemo, useState } from 'react';
import { RootState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Row } from 'reactstrap';
import { DateTime } from 'luxon';
import { MapPin, Settings, AlertOctagon, Edit } from 'react-feather';
import { Show } from '@common/show';
import Skeleton from 'react-loading-skeleton';
import { ContractChange } from './contract-change';
import { IContractEntity } from '../dtos/contract.entity';
import { contractActions } from '../store';
import { ContractEdit } from './contract-edit';
import { ContractFile } from './contract-file';

interface IProps {
  pending: boolean;
}

export const ContractInfo = ({ pending }: IProps) => {

  const dispatch = useDispatch();
  const { contract } = useSelector((state: RootState) => state.contract);

  const [option, setOption] = useState<string | undefined>(undefined);

  const switchOptions = {
    CHANGE: 'CHANGE',
    EDIT: 'EDIT',
  }

  const isContract = useMemo(() => {
    return Object.keys(contract || {}).length > 1;
  }, [contract]);

  const displayDateOfResolution = useMemo(() => {
    if (!contract?.dateOfResolution) return '';
    return DateTime.fromSQL(`${contract?.dateOfResolution}`).toFormat('dd/MM/yyyy');
  }, [contract]);

  const displayDateOfAdmission = useMemo(() => {
    if (!contract?.dateOfAdmission) return '';
    return DateTime.fromSQL(`${contract?.dateOfAdmission}`).toFormat('dd/MM/yyyy');
  }, [contract]);

  const displayTerminationDate = useMemo(() => {
    if (!contract?.terminationDate) return 'Permanente';
    return DateTime.fromSQL(`${contract?.terminationDate}`).toFormat('dd/MM/yyyy');
  }, [contract]);

  const handleAdd = (cont: IContractEntity) => {
    dispatch(contractActions.find(cont));
    setOption(undefined);
  }

  const ComponentErrorHeader = (
    <div className="text-center">
      <AlertOctagon size={30}
        className="text-danger"
      />
      <div className='text-center'>
        <b>Intente más tarde</b>
      </div>
    </div>
  )

  const ComponentErrorBody = (
    <div className="text-center">
      No hay registros disponibles
    </div>
  )

  return (
    <>
      <Card>
        <CardHeader>
          <h6 className='text-left'>
            <Show condition={isContract}
              isDefault={pending ? <Skeleton/> : ComponentErrorHeader}
            >
              <span className={`ml-1 badge badge-${contract?.state ? 'success' : 'danger'}`}>
                {contract?.code}
              </span>

              <Show condition={!pending}>
                <span className='close'
                  title='Cambiar de contrato'
                  onClick={() => setOption(switchOptions.CHANGE)}
                >
                  <Settings className='icon cursor-pointer'/>
                </span>
              </Show>
            </Show>
          </h6>
        </CardHeader>
        <CardBody>
          <Show condition={isContract}
            isDefault={pending ? 'obteniendo datos' : ComponentErrorBody}
          >
            <Row>
              <Col md="6">
                <FormGroup className='mb-3'>
                  <label>Tipo. Trabajador</label>
                  <h6>{contract?.typeCategory?.typeCargo?.name || ''}</h6>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className='mb-3'>
                  <label>Condición</label>
                  <h6>{contract?.condition || ''}</h6>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className='mb-3'>
                  <label>Categoría</label>
                  <h6 >{contract?.typeCategory?.name || 'N/A'}</h6>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className='mb-3'>
                  <label>Código AIRHSP</label>
                  <h6 >{contract?.codeAIRHSP || 'N/A'}</h6>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className='mb-3'>
                  <label>N° Resolución</label>
                  <h6>{contract?.resolution || 'N/A'}</h6>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className='mb-3'>
                  <label>Fecha de Resolución</label>
                  <h6>{displayDateOfResolution}</h6>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className='mb-3'>
                  <label>Fecha de Ingreso</label>
                  <h6>{displayDateOfAdmission}</h6>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className='mb-3'>
                  <label>Fecha de Cese</label>
                  <h6>{displayTerminationDate}</h6>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className='mb-3'>
                  <label>Plaza</label>
                  <h6 >{contract?.plaza || 'N/A'}</h6>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className='mb-3'>
                  <label>Ley</label>
                  <h6 >{contract?.ley || 'N/A'}</h6>
                </FormGroup>
              </Col>

              <Col md="12">
                <FormGroup className='mb-3'>
                  <label>Observación</label>
                  <h6>{contract?.observation || 'N/A'}</h6>
                </FormGroup>
              </Col>

              <Col md="12">
                <hr />
                <MapPin className='icon'/> Entorno de Trabajo
                <hr />
              </Col>

              <Col md="12">
                <FormGroup className='mb-3'>
                  <label>Dependencia</label>
                  <h6>{contract?.dependency?.name || 'N/A'}</h6>
                </FormGroup>
              </Col>

              <Col md="12">
                <FormGroup className='mb-3'>
                  <label>Perfil Laboral</label>
                  <h6>{contract?.profile?.name || 'N/A'}</h6>
                </FormGroup>
              </Col>

              <Col md="12">
                <FormGroup className='mb-3'>
                  <label>Horario</label>
                  <h6>{contract?.hourhand?.name || 'N/A'}</h6>
                </FormGroup>
              </Col>

              <Col md="12">
                <FormGroup className='mb-3'>
                  <label>Archivo</label>
                  <h6>
                    <ContractFile/>
                  </h6>
                </FormGroup>
              </Col>
            </Row>
          </Show>
        </CardBody>
        <CardFooter className='text-right'>
          <Button outline
            color='info'
            size='sm'
            onClick={() => setOption(switchOptions.EDIT)}
          >
            <Edit className='icon'/>
          </Button>
        </CardFooter>
      </Card>
      {/* options */}
      <ContractChange
        onAdd={handleAdd}
        isOpen={switchOptions.CHANGE == option}
        onClose={() => setOption(undefined)}
      />
      {/* edit */}
      <ContractEdit
        isOpen={switchOptions.EDIT == option}
        onClose={() => setOption(undefined)}
      />
    </>
  )
}