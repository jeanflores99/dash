/* eslint-disable react-hooks/exhaustive-deps */
import { RegisterEmptyError } from "@common/errors/register-empty.error";
import { Show } from "@common/show";
import { RootState } from "@store/store";
import { useEffect, useState } from "react";
import { Search } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Input, Row } from "reactstrap";
import { getLicensesToContract } from "../apis";
import { ILicenseEntity } from "../dtos/license.entity";
import { licenseActions } from "../store";
import { LicenseEdit } from "./license-edit";
import { LicenseInfo } from "./license-info";

export const LicenseList = () => {

  const dispatch = useDispatch();
  const { licenses, option } = useSelector((state: RootState) => state.license);
  const { contract } = useSelector((state: RootState) => state.contract);

  const [loading, setLoading] = useState<boolean>(true);
  const [isRefresh, setIsRefresh] = useState<boolean>(true);
  const [perPage] = useState<number>(30);
  const [page] = useState<number>(1);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [querySearch, setQuerySearch] = useState<string>("");
  const [, setIsError] = useState<boolean>(false); 

  const handleData = async () => {
    setLoading(true);
    setIsError(false);
    await getLicensesToContract(contract?.id || 0, {
      page,
      limit: perPage,
      year,
      querySearch
    }).then(data => dispatch(licenseActions.paginate(data)))
    .catch(() => setIsError(true))
    setLoading(false);
  }

  const handleEdit = async (license: ILicenseEntity) => {
    dispatch(licenseActions.setLicense(license));
    dispatch(licenseActions.changeOption("EDIT"));
  }

  useEffect(() => {
    if (isRefresh) handleData();
  }, [isRefresh]);

  useEffect(() => {
    if (isRefresh) setIsRefresh(false);
  }, [isRefresh]);

  useEffect(() => {
    if (option == "REFRESH") {
      setIsRefresh(true);
    }
  }, [option]);

  useEffect(() => {
    if (option == "REFRESH") {
      dispatch(licenseActions.changeOption(""));
    }
  }, [option]);

  return (
    <>
      <div className="prooduct-details-box mb-3">  
        <Row>
          {/* buscador */}
          <Col md="6" className="mb-2">
            <Input type="text"
              placeholder="Búsqueda por N° Documento..."
              value={querySearch}
              onChange={({ target }) => setQuerySearch(target.value)}
            />
          </Col>
          <Col md="4" className="mb-2">
            <Input type="number"
              placeholder="Búsqueda por año..."
              value={year || ''}
              onChange={({ target }) => setYear(parseInt(target.value))}
            />
          </Col>
          <Col md="2" className="mb-2">
            <Button block
              color="primary"
              disabled={loading}
              onClick={() => setIsRefresh(true)}
            >
              <Search className="icon"/>
            </Button>
          </Col>
          {/* limite */}
          <Col md="12">
            <hr />
          </Col>
          {/* not licenses */}
          <Show condition={!loading && !licenses.items?.length}>
            <Col md="12">
              <RegisterEmptyError
                onRefresh={() => setIsRefresh(true)}
              />
            </Col>
          </Show>
          {/* loading */}
          <Show condition={loading}>
            <Col md="12" className="text-center">
              Obtener datos...
            </Col>
          </Show>
          {/* listar licenses */}
          {licenses?.items?.map(i => 
            <Col key={`list-license-${i.id}`}
              md="6"
            >
              <LicenseInfo license={i}
                onEdit={handleEdit}
              />
            </Col>
          )}
        </Row>  
      </div>
      {/* editar */}
      <LicenseEdit isOpen={option == "EDIT"}
        onClose={() => dispatch(licenseActions.changeOption(""))}
        onSave={() => dispatch(licenseActions.changeOption("REFRESH"))}
      />
    </>
  )
}