import { DateClickArg } from "@fullcalendar/interaction";
import { RootState } from "@store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { scheduleActions } from "../store";
import { ScheduleCreate } from "./schedule-create";
import { ScheduleList } from "./schedule-list";

interface IProps {
  isOpen: boolean
  onClose: () => void
}

export const ScheduleContent = ({ isOpen, onClose }: IProps) => {

  const dispatch = useDispatch();
  const { option } = useSelector((state: RootState) => state.schedule);

  const [dateDefault, setDateDefault] = useState<string>("");

  const handleCreate = ({ dateStr }: DateClickArg) => {
    setDateDefault(dateStr);
    dispatch(scheduleActions.changeOption("CREATE"));
  } 

  return (
    <>
      <Modal isOpen={isOpen}
        size="lg"
        style={{ minWidth: "90%" }}
      >
        <ModalHeader toggle={onClose}>
          Horarios
        </ModalHeader>
        <ModalBody>
          <ScheduleList onCreate={handleCreate}/>
        </ModalBody>
      </Modal>
      {/* crear schedule */}
      <ScheduleCreate 
        dateDefault={dateDefault}
        onClose={() => dispatch(scheduleActions.changeOption(""))}
        isOpen={option == "CREATE"}
        onSave={() => dispatch(scheduleActions.changeOption("REFRESH"))}
      />
    </>
  )
}