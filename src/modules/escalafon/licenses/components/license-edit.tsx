/* eslint-disable no-unused-vars */
import { IInputHandle } from "@common/dtos/input-handle";
import { RootState } from "@store/store";
import { useEffect, useState } from "react";
import { RefreshCw } from "react-feather";
import { useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { createLicense, editLicense } from "../apis";
import { ILicenseFormDto } from "../dtos/license-form.dto";
import { LicenseForm } from "./license-form";
import { toast } from "react-toastify";
import { ILicenseEntity } from "../dtos/license.entity";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (license: ILicenseEntity) => void
}

export const LicenseEdit = ({ isOpen, onClose, onSave }: IProps) => {

  const { license } = useSelector((state: RootState) => state.license);

  const [form, setForm] = useState<ILicenseFormDto>(license);
  const [loading, setLoading] = useState<boolean>(false);

  const handleForm = ({ name, value }: IInputHandle) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setLoading(true);
    toast.dismiss();
    await editLicense(license?.id || 0, form)
      .then(data => {
        toast.success(`Los cambios se actualizarón correctamente`)
        if (typeof onSave == 'function') onSave(data);
    }).catch(() => toast.error(`No se pudo actualizar los datos`))
    setLoading(false);
  }

  useEffect(() => {
    if (license?.id) setForm(license);
  }, [license]);

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={onClose}>
        Editar Licencia
      </ModalHeader>
      <ModalBody>
        <LicenseForm
          form={form}
          onChange={handleForm}
          isDisabled={loading}
        />
      </ModalBody>
      <ModalFooter className="text-right">
        <Button color="primary"
          disabled={loading}
          onClick={handleSave}
        >
          <RefreshCw className="icon"/>
        </Button>
      </ModalFooter>
    </Modal>
  )
}