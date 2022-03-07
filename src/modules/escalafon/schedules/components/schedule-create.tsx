/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { IInputHandle } from "@common/dtos/input-handle";
import { RootState } from "@store/store";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Save } from "react-feather";
import { useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { createSchedule } from "../apis";
import { IScheduleFormDto } from "../dtos/schedule-form.dto";
import { ScheduleForm } from "./schedule-form";
import { toast } from "react-toastify";
import { IScheduleEntity, ScheduleModeEnum } from "../dtos/schedule.entity";
import { ProgressIndicator } from "@atlaskit/progress-indicator";
import { Show } from "@common/show";
import { ICreateCollectionScheduleDto } from "../dtos/create-schedule.dto";

interface IProps {
  isOpen: boolean;
  dateDefault: string;
  onClose: () => void;
  onSave: (license: IScheduleEntity) => void
}

interface IStepOptions {
  title: string
  content: any
  btn: any
  btnIndex: number,
  isSave?:  boolean
}

export const ScheduleCreate = ({ isOpen, dateDefault, onClose, onSave }: IProps) => {

  const { contract } = useSelector((state: RootState) => state.contract);

  const dataDefault: IScheduleFormDto = {
    date: dateDefault,
    checkInTime: "",
    tolerance: 0,
    observation: "",
    mode: ScheduleModeEnum.ENTRY
  }

  const [entry, setEntry] = useState<IScheduleFormDto>(dataDefault);
  const [exit, setExit] = useState<IScheduleFormDto>(dataDefault);
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const stepOptions: IStepOptions[] = [
    {
      title: "Hora de Ingreso",
      btn: <>Hora de Salida <ArrowRight className="icon" /></>,
      btnIndex: 1,
      content: (
        <ScheduleForm
          form={entry}
          isEdit
          onChange={input => handleForm(setEntry, input)}
          isDisabled={loading}
        />
      )
    },
    {
      title: "Hora de Salida",
      btn: <><ArrowLeft className="icon" /> Hora de Ingreso</>,
      btnIndex: 0,
      isSave: true,
      content: (
        <ScheduleForm
          form={exit}
          onChange={input => handleForm(setExit, input)}
          isDisabled={loading}
        />
      )
    }
  ]

  const handleClose = () => {
    if (typeof onClose == 'function') {
      onClose();
    }
    // clear step
    setStep(0);
  }

  const handleForm = (setAble: any, { name, value }: IInputHandle) => {
    setAble((prev: any) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setLoading(true);
    toast.dismiss();
    const payload: ICreateCollectionScheduleDto = {
      contractId: contract?.id || 0,
      entry,
      exit
    }
    // save schedule
    await createSchedule(payload)
      .then(data => {
        toast.success(`Los datos se guardarón correctamente`)
        setEntry(dataDefault);
        setExit(dataDefault);
        setStep(0);
        if (typeof onSave == 'function') onSave(data);
    }).catch(() => toast.error(`No se pudo guardar los datos`))
    setLoading(false);
  }

  const currentStep: IStepOptions | undefined = useMemo(() => {
    return stepOptions.find((i, index) => index == step);
  }, [step, exit, entry]);

  useEffect(() => {
    if (dateDefault) {
      handleForm(setEntry, { name: "date", value: dateDefault });
      handleForm(setExit, { name: "date", value: dateDefault });
    }
  }, [dateDefault])

  useEffect(() => {
    if (contract?.id) {
      setEntry(dataDefault);
      setExit(dataDefault);
    }
  }, [contract]);

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={handleClose}>
        {currentStep?.title || ""}
      </ModalHeader>
      <ModalBody>
        <ProgressIndicator
          selectedIndex={step}
          values={stepOptions}
          appearance={'primary'}
        />
        {/* content */}
        {currentStep?.content || null}
      </ModalBody>
      <ModalFooter className="text-right">
        {/* btn */}
        <Button color="dark"
          disabled={loading}
          onClick={() => setStep(currentStep?.btnIndex || 0)}
        >
          {currentStep?.btn || ""}
        </Button>
        {/* save */}
        <Show condition={currentStep?.isSave || false}>
          <Button color="primary"
            disabled={loading}
            onClick={handleSave}
          >
            <Save className="icon"/>
          </Button>
        </Show>
      </ModalFooter>
    </Modal>
  )
}