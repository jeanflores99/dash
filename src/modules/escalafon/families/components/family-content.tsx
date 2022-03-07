/* eslint-disable react-hooks/exhaustive-deps */
import { RegisterEmptyError } from "@common/errors/register-empty.error";
import { Show } from "@common/show";
import { RootState } from "@store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { getFamiliesByWork } from "../apis";
import { familyActions } from "../store";
import { FamilyInfo } from "./family-info";
import { FamilyCreate } from '@modules/escalafon/families/components/family-create';
import { workActions } from "@modules/escalafon/works/store";
import { PersonEdit } from "@modules/auth/person/components/person-edit";
import { IFamilyEntity } from "../dtos/family.entity.dto";
import { personActions } from "@modules/auth/person/store";

export const FamilyContent = () => {

  const [pending, setPending] = useState<boolean>(true);
  const [, setIsError] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { work, option } = useSelector((state: RootState) => state.work);
  const { families } = useSelector((state: RootState) => state.family);

  const handleFamilies = async () => {
    setPending(true);
    setIsError(false);
    await getFamiliesByWork(work?.id || 0, { page: 1, limit: 30 })
      .then(data => dispatch(familyActions.paginate(data)))
      .catch(() => setIsError(true));
    setPending(false);
  }
  
  const handleEdit = (family: IFamilyEntity) => {
    const person = family.person || {};
    setIsEdit(true);
    dispatch(personActions.setPerson(person as any));
  }

  useEffect(() => {
    if (isRefresh) handleFamilies();
  }, [isRefresh])

  useEffect(() => {
    if (isRefresh) setIsRefresh(false);
  }, [isRefresh])

  return (
    <Row> 
      {/* data empty */}
      <Show condition={!pending && !families.items?.length}>
        <Col md="12">
          <RegisterEmptyError />
        </Col>
      </Show>
      {/* listar family */}
      {families?.items?.map(i => 
        <Col md="6" key={`list-family-${i}`}>
          <FamilyInfo
            family={i}
            onEdit={handleEdit}
          />
        </Col>  
      )}
      {/* crear family */}
      <FamilyCreate
        isOpen={option == "CREATE_FAMILY"}
        onClose={() => dispatch(workActions.changeOption(""))}
        onSave={() => setIsRefresh(true)}
      />
      {/* edit family */}
      <PersonEdit
        isOpen={isEdit}
        onClose={() => setIsEdit(false)}
        onSave={() => setIsRefresh(true)}
      />
    </Row>
  )
}