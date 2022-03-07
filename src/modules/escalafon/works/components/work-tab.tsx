/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { Card, Col, Nav, NavItem, NavLink, Row, FormGroup, Button } from 'reactstrap';
import { Target, File, Book, PlusSquare, Home } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { ContractCreate } from '../../contracts/components/contract-create';
import { workActions } from '../store';
import { ContractContent } from '@modules/escalafon/contracts/components/contract-content';
import { WorkContent } from './work-content';
import { IContractEntity } from '@modules/escalafon/contracts/dtos/contract.entity';
import { contractActions } from '@modules/escalafon/contracts/store';
import { findContract } from '@modules/escalafon/contracts/apis';
import { FamilyContent } from '@modules/escalafon/families/components/family-content';
import { Show } from '@common/show';

const switchOptions = {
  CREATE_CONTRACT: "CREATE_CONTRACT",
  CREATE_FAMILY: "CREATE_FAMILY"
}

interface IPropsItem {
  Icon: any
  title: string
  index: number
}

const tabItems = [
  {
    title: "General",
    icon: Target,
    content: <WorkContent />,
    btnCreate: "Nuevo Contrato",
    eventBtnCreate: switchOptions.CREATE_CONTRACT
  },
  {
    title: "Contratos",
    icon: File,
    content: <ContractContent />,
    btnCreate: "Nuevo Contrato",
    eventBtnCreate: switchOptions.CREATE_CONTRACT
  },
  {
    title: "Familia",
    icon: Home,
    content: <FamilyContent/>,
    btnCreate: "Nuevo Familiar",
    eventBtnCreate: switchOptions.CREATE_FAMILY
  },
  {
    title: "Grados",
    icon: Book
  },
];

const ItemTab = ({ Icon, title, index }: IPropsItem) => {
  const dispatch = useDispatch();
  const { tabIndex } = useSelector((state: RootState) => state.work);

  return (
    <NavItem className='cursor-pointer'
      onClick={() => dispatch(workActions.changeTab(index))}
    >
      <NavLink
        className={tabIndex == index ? 'active' : ''}
      >
        <Icon/> {title}
      </NavLink>
    </NavItem>
  )
}

export const WorkTab = () => {

  const dispatch = useDispatch();

  const { mode } = useSelector((state: RootState) => state.screen);
  const { tabIndex, option } = useSelector((state: RootState) => state.work);

  const currentContent = useMemo(() => {
    return tabItems[tabIndex] || {};
  }, [tabIndex]);

  const displayTextBtn = () => {
    const allower = ['sm', 'xs'];
    const isAllower = allower.includes(`${mode}`);
    if (isAllower) return '';
    return currentContent?.btnCreate || '';
  }

  const handleSave = (data: IContractEntity) => {
    dispatch(workActions.changeOption(""));
    dispatch(workActions.changeTab(1));
    dispatch(contractActions.find(data));
    findContract(data.id)
      .then(contract => dispatch(contractActions.find(contract)))
      .catch(() => dispatch(contractActions.find(null)));
  }

  return (
    <>
      <div className='project-list'>
        <Card>
          <Row>
            <Col md="8" sm="9">
              <Nav tabs className="border-tab">
                {tabItems.map((i, index) =>
                  <ItemTab
                    key={`item-tab-index-${index}`}
                    title={i.title}
                    Icon={i.icon}
                    index={index}
                  />
                )}
              </Nav>
            </Col>
            <Show condition={currentContent?.btnCreate ? true : false}>
              <Col md="4" sm="3">
                <div className="text-center">
                  <FormGroup className="mb-0 mr-0"></FormGroup>
                  <Button color='primary'
                    title='Nuevo contrato'
                    onClick={() => dispatch(workActions.changeOption(currentContent?.eventBtnCreate || ''))}
                  >
                    <PlusSquare /> {displayTextBtn()}
                  </Button>
                </div>
              </Col>
            </Show>
          </Row>
        </Card>
      </div>
      {/* content */}
      {currentContent?.content || null}
      {/* crear contrato */}
      <ContractCreate 
        isOpen={switchOptions.CREATE_CONTRACT == option}
        onSave={handleSave}
        onClose={() => dispatch(workActions.changeOption(""))}
      />
    </>
  )
}