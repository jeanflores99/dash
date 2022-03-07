import { Card, CardBody } from "reactstrap";
import { AlertTriangle, RefreshCcw } from "react-feather";
import { useState } from "react";

interface IProps {
  onRefresh?: () => void;
}

export const RegisterEmptyError = ({ onRefresh }: IProps) => {

  const [isRefresh, setIsRefresh] = useState(false);

  const handleOnRefresh = () => {
    if (typeof onRefresh == 'function') {
      onRefresh();
    }
  }

  return (
    <Card>
      <CardBody className="text-center cursor-pointer"
        onMouseEnter={() => setIsRefresh(true)}
        onMouseLeave={() => setIsRefresh(false)}
        onClick={handleOnRefresh}
      >
        <div>
          {isRefresh
            ? <RefreshCcw className="text-primary"/>
            : <AlertTriangle className="text-warning"/>}
        </div>
        <span>
          {isRefresh ? 'Volver a obtener datos' : 'No hay registros disponibles'}
        </span>
      </CardBody>
    </Card>
  )
}