/* eslint-disable no-unused-vars */
import { getWorkToContracts } from '@modules/escalafon/works/apis';
import { RootState } from '@store/store';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { Check } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { IContractEntity } from '../dtos/contract.entity';
import { contractActions } from '../store';

interface IProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (contract: IContractEntity) => void
}

export const ContractChange = ({ isOpen, onClose, onAdd }: IProps) => {

  const [, setPending] = useState<boolean>(true);
  const [, setIsError] = useState<boolean>(false);
  const [page] = useState<number>(1);
  const { work } = useSelector((state: RootState) => state.work);
  const { contracts, contract } = useSelector((state: RootState) => state.contract);
  const dispatch = useDispatch();

  const getData = async () => {
    setPending(true);
    setIsError(false);
    await getWorkToContracts(work?.id || 0, { page })
      .then(data => {
        dispatch(contractActions.paginate(data));
        setIsError(false);
      }).catch(() => setIsError(true))
    setPending(false);
  }

  const handleAdd = (cont: IContractEntity) => {
    if (typeof onAdd == 'function') {
      onAdd(cont);
    }
  }

  useEffect(() => {
    if (work?.id && isOpen) getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [work, isOpen])

  return (
    <Modal isOpen={isOpen}
      toggle={onClose}
    >
      <ModalHeader toggle={onClose}>
        Cambiar de contrato
      </ModalHeader>
      <ModalBody>
        {contracts?.items?.map((cont, index) => 
          <Col xl="12" md="12" key={`list-item-contract-change-${index}`}>
            <div className="prooduct-details-box mb-3">                                 
              <div className="media">
                <div className="media-body ml-3">
                  <div className="product-name">
                    <h6>
                      <span className={`badge badge-${cont?.state ? 'success' : 'danger'}`}>{cont.code}</span>
                    </h6>
                  </div>
                  <div>
                    Tipo de Trabajador:
                    <b className='ml-1'>
                      {cont?.typeCategory?.typeCargo?.name || ''}
                    </b>
                  </div>
                  <div>
                    Categoría:
                    <b className='ml-1'>
                      {cont?.typeCategory?.name || ''}
                    </b>
                  </div>
                  <div>
                    Condición:
                    <b className='ml-1'>
                      {cont?.condition || ''}
                    </b>
                  </div>
                  <div>
                    N° Resolución:
                    <b className='ml-1'>
                      {cont.resolution || ''}
                    </b>
                  </div>
                  <div>
                    Fecha de Resolución:
                    <b className='ml-1'>
                      {DateTime.fromSQL(`${cont.dateOfResolution}`).toFormat('dd/MM/yyyy')}
                    </b>
                  </div>
                  <div>
                    Fecha de Ingreso:
                    <b className='ml-1'>
                      {DateTime.fromSQL(`${cont.dateOfAdmission}`).toFormat('dd/MM/yyyy')}
                    </b>
                  </div>
                  <div>
                    Fecha de Cese:
                    <b className='ml-1'>
                      {cont.terminationDate
                        ? DateTime.fromSQL(`${cont.terminationDate}`).toFormat('dd/MM/yyyy')
                        : 'Indefinido'
                      }
                    </b>
                  </div>
                  {/* btn */}
                  <Button color="primary"
                    className='btn-bottom-right'
                    outline={contract?.id !== cont.id}
                    size="xs"
                    disabled={contract?.id === cont.id}
                    onClick={() => handleAdd(cont)}
                  >
                    <Check className="icon"/>
                  </Button>
                </div>
              </div>
              </div>
          </Col>  
        )}
      </ModalBody>
    </Modal>
  )
}