/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { IInputHandle } from "@common/dtos/input-handle";
import { RootState } from "@store/store";
import { useEffect, useMemo, useState } from "react";
import { Save } from "react-feather";
import { useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { createLicense } from "../apis";
import { ILicenseFormDto } from "../dtos/license-form.dto";
import { LicenseForm } from "./license-form";
import { toast } from "react-toastify";
import { ILicenseEntity } from "../dtos/license.entity";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (license: ILicenseEntity) => void
}

export const LicenseCreate = ({ isOpen, onClose, onSave }: IProps) => {

  const { contract } = useSelector((state: RootState) => state.contract);

  const dataDefault: ILicenseFormDto = {
    contractId: contract?.id || 0,
    typeLicenseId: 0,
    resolution: "RS",
    dateOfResolution: "",
    dateOfAdmission: "",
    terminationDate: "",
    daysUsed: 0,
    isPay: false,
    description: ""
  }

  const [form, setForm] = useState<ILicenseFormDto>(dataDefault);
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
    await createLicense(form)
      .then(data => {
        toast.success(`Los datos se guardarón correctamente`)
        setForm(dataDefault);
        if (typeof onSave == 'function') onSave(data);
    }).catch(() => toast.error(`No se pudo guardar los datos`))
    setLoading(false);
  }

  useEffect(() => {
    if (contract?.id) setForm(dataDefault);
  }, [contract]);

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={onClose}>
        Nueva Licencia
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
          <Save className="icon"/>
        </Button>
      </ModalFooter>
    </Modal>
  )
}