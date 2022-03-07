/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { Form, FormGroup, Input } from "reactstrap";import { IScheduleFormDto } from "../dtos/schedule-form.dto";
import { IInputHandle } from "@common/dtos/input-handle";
import { plainToClass } from "class-transformer";
import { ScheduleSerialize } from "../serializers/schedule.serialize";

interface IProps {
  form: IScheduleFormDto,
  onChange: (input: IInputHandle) => void,
  isDisabled?: boolean;
  isEdit?: boolean;
}

export const ScheduleForm = ({ form, onChange, isDisabled, isEdit }: IProps) => {

  
  const handleCheckInTime = ({ name, value }: IInputHandle) => {
    const scheduleSerialize = plainToClass(ScheduleSerialize, {
      ...form,
      checkInTime: value
    });
    onChange({ name, value: scheduleSerialize.displayCheckInTime });
  }

  return (
    <Form>
      <FormGroup>
        <label>Fecha <b className="text-danger">*</b></label>
        <Input type="date"
          name="date"
          value={form?.date || ''}
          onChange={({ target }) => onChange(target)}
          disabled={isDisabled || isEdit}
        />
      </FormGroup>

      <FormGroup>
        <label>Hora de regístro <b className="text-danger">*</b></label>
        <Input type="time"
          name="checkInTime"
          value={form?.checkInTime}
          onChange={({ target }) => handleCheckInTime(target)}
          disabled={isDisabled}
        />
      </FormGroup>

      <FormGroup>
        <label>Tolerancia <b className="text-danger">*</b></label>
        <Input type="number"
          name="tolerance"
          value={form?.tolerance}
          onChange={({ target }) => onChange({
            name: target.name,
            value: parseInt(target.value)
          })}
          disabled={isDisabled}
        />
      </FormGroup>

      <FormGroup>
        <label>Observación</label>
        <Input type="textarea"
          name="observation"
          value={form?.observation || ''}
          onChange={({ target }) => onChange(target)}
          disabled={isDisabled}
        />
      </FormGroup>
    </Form>
  )
}