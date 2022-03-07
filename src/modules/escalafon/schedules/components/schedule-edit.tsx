/* eslint-disable no-unused-vars */
import { IInputHandle } from "@common/dtos/input-handle";
import { RootState } from "@store/store";
import { useEffect, useState } from "react";
import { RefreshCw, Trash2 } from "react-feather";
import { useSelector } from "react-redux";
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteSchedule, editSchedule } from "../apis";
import { IScheduleFormDto } from "../dtos/schedule-form.dto";
import { ScheduleForm } from "./schedule-form";
import { toast } from "react-toastify";
import { IScheduleEntity, ScheduleModeEnum } from "../dtos/schedule.entity";
import { Show } from "@common/show";
import { plainToClass } from "class-transformer";
import { ScheduleSerialize } from "../serializers/schedule.serialize";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (schedule: IScheduleEntity) => void;
  onSave: (schedule: IScheduleEntity) => void
}

export const ScheduleEdit = ({ isOpen, onClose, onSave, onDelete }: IProps) => {

  const { schedule } = useSelector((state: RootState) => state.schedule);

  const [form, setForm] = useState<IScheduleFormDto>(schedule);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    if (typeof onClose == 'function') onClose();
    setForm(schedule);
  }

  const handleForm = ({ name, value }: IInputHandle) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setLoading(true);
    const formSerialize = plainToClass(ScheduleSerialize, form);
    // send data
    toast.dismiss();
    await editSchedule(schedule?.id || 0, {
      ...form,
      checkInTime: formSerialize.displayCheckInTime
    })
      .then(data => {
        toast.success(`Los cambios se actualizarón correctamente`)
        if (typeof onSave == 'function') onSave(data);
    }).catch(() => toast.error(`No se pudo actualizar los datos`))
    setLoading(false);
  }

  const handleDelete = async () => {
    setLoading(true);
    toast.dismiss();
    await deleteSchedule(schedule?.id || 0)
      .then(() => {
        toast.success(`El regístro se eliminó correctamente`)
        if (typeof onDelete == 'function') onDelete(schedule);
    }).catch(() => toast.error(`No se pudo eliminar el regístro`))
    setLoading(false);
  }

  useEffect(() => {
    if (schedule?.id) setForm(schedule);
  }, [schedule]);

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={handleClose}>
        Editar Hora de {schedule.mode == ScheduleModeEnum.ENTRY ? "Entrada" : "Salida"}
      </ModalHeader>
      <ModalBody>
        <ScheduleForm
          form={form}
          onChange={handleForm}
          isDisabled={loading}
        />
      </ModalBody>
      <ModalFooter className="text-right">
        <ButtonGroup>
          {/* delete */}
          <Show condition={schedule?.mode == ScheduleModeEnum.ENTRY}>
            <Button color="danger"
              disabled={loading}
              outline
              onClick={handleDelete}
            >
              <Trash2 className="icon"/>
            </Button>
          </Show>
          {/* update */}
          <Button color="primary"
            disabled={loading}
            onClick={handleSave}
          >
            <RefreshCw className="icon"/>
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  )
}