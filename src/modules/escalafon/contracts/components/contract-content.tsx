import React, { MouseEvent, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { ContractInfo } from './contract-info';
import { useDispatch, useSelector } from 'react-redux';
import { findLastContract } from '@modules/escalafon/works/apis';
import { RootState } from '@store/store';
import { contractActions } from '../store';
import {
  Activity,
  Calendar,
  // FileText,
  // Compass,
  Clipboard,
  // ArrowUpRight,
  // Users,
  // Grid
} from "react-feather";
import { IContractEntity } from '../dtos/contract.entity';
import { LicenseContent } from '@modules/escalafon/licenses/components/license-content';
import { ScheduleContent } from '@modules/escalafon/schedules/components/schedule-content';

const optionActions = {
  SCHEDULE: "SCHEDULE",
  BALLOT: "BALLOT",
  VACATION: "VACATION",
  LICENSE: "LICENSE",
  ASCENT: "ASCENT",
  DISPLACEMENT: "DISPLACEMENT",
  MERIT: "MERIT"
}

const ListActions = [
  { 
    label: "Horarios",
    icon: Calendar,
    key: optionActions.SCHEDULE
  },
  // { 
  //   label: "Papeletas",
  //   icon: FileText,
  //   key: optionActions.BALLOT
  // },
  // { 
  //   label: "Vacaciones",
  //   icon: Compass,
  //   key: optionActions.VACATION
  // },
  { 
    label: "Licencias",
    icon: Clipboard,
    key: optionActions.LICENSE
  },
  // { 
  //   label: "Acensos",
  //   icon: ArrowUpRight,
  //   key: optionActions.ASCENT
  // },
  // { 
  //   label: "Desplazamientos",
  //   icon: Users,
  //   key: optionActions.DISPLACEMENT
  // },
  // { 
  //   label: "Mérito/Demérito",
  //   icon: Grid,
  //   key: optionActions.MERIT
  // }
]

export const ContractContent = () => {

  const dispatch = useDispatch();
  const { work } = useSelector((state: RootState) => state.work);
  const { option, contract } = useSelector((state: RootState) => state.contract);
  const [pending, setPending] = useState<boolean>(true);

  const handleFindLastContract = async () => {
    setPending(true);
    await findLastContract(work?.id || 0)
      .then(data => {
        const contract: IContractEntity = data;
        dispatch(contractActions.find(contract))
    }).catch(() => dispatch(contractActions.find(null)))
    setPending(false);
  }

  const handleClick = (e: MouseEvent, key: string) => {
    e.preventDefault();
    if (contract?.id) {
      dispatch(contractActions.changeOption(key))
    }
  }

  useEffect(() => { 
    if (work?.id) handleFindLastContract();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [work])

  return (
    <>
      <Row>
        <Col md="7">
          <ContractInfo
            pending={pending}
          />
        </Col>
        {/* license */}
        <Col md="5">
          <Card>
            <CardHeader>
              <h6><Activity className='icon'/> Acciones</h6>
            </CardHeader>
            <CardBody>
              {ListActions.map((l, index: number) => 
                <div className='mb-2 capitalize'
                  key={`list-${index}`}
                >
                  <a href="#" onClick={(e) => handleClick(e, l.key)}
                    className={contract?.id ? '' : 'text-muted'}
                  >
                    <l.icon className='icon' /> {l.label}
                  </a>
                </div>  
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* schedules */}
      <ScheduleContent isOpen={optionActions.SCHEDULE == option}
        onClose={() => dispatch(contractActions.changeOption(""))}
      />
      {/* license */}
      <LicenseContent isOpen={optionActions.LICENSE == option}
        onClose={() => dispatch(contractActions.changeOption(""))}
      />
    </>
  )
}