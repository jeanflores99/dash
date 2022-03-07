import { RootState } from "@store/store";
import { Plus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { licenseActions } from "../store";
import { LicenseCreate } from "./license-create";
import { LicenseList } from "./license-list";

interface IProps {
  isOpen: boolean
  onClose: () => void
}

export const LicenseContent = ({ isOpen, onClose }: IProps) => {

  const dispatch = useDispatch();
  const { option } = useSelector((state: RootState) => state.license);

  return (
    <>
      <Modal isOpen={isOpen}
        size="lg"
        style={{ minWidth: "90%" }}
      >
        <ModalHeader toggle={onClose}>
          Licencias
        </ModalHeader>
        <ModalBody>
          <LicenseList/>
        </ModalBody>
        <ModalFooter className="text-right">
          <Button outline
            color="success"
            onClick={() => dispatch(licenseActions.changeOption("CREATE"))}
          >
            <Plus className="icon"/>
          </Button>
        </ModalFooter>
      </Modal>
      {/* crear license */}
      <LicenseCreate 
        onClose={() => dispatch(licenseActions.changeOption(""))}
        isOpen={option == "CREATE"}
        onSave={() => dispatch(licenseActions.changeOption("REFRESH"))}
      />
    </>
  )
}