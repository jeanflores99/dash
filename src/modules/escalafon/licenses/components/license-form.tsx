/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import Toggle from "@atlaskit/toggle";
import { TypeLicenseSelect } from "@modules/escalafon/type-licenses/components/type-license-select";
import { ILicenseFormDto } from "../dtos/license-form.dto";
import { IInputHandle } from "@common/dtos/input-handle";
import { DateTime } from "luxon"

interface IProps {
  form: ILicenseFormDto,
  onChange: (input: IInputHandle) => void,
  isDisabled?: boolean;
}

export const LicenseForm = ({ form, onChange, isDisabled }: IProps) => {

  const calcDaysUsed = () => {
    const dateOfAdmission = DateTime.fromSQL(`${form?.dateOfAdmission}`);
    const terminationDate = DateTime.fromSQL(`${form?.terminationDate}`);
    const diff = terminationDate.diff(dateOfAdmission, "days").days + 1;
    onChange({ name: "daysUsed", value: diff || 0 })
  }

  useEffect(() => {
    calcDaysUsed();
  }, [form?.dateOfAdmission, form?.terminationDate])

  return (
    <Form>
      <FormGroup>
        <label>Tipo de Licencia <b className="text-danger">*</b></label>
        <TypeLicenseSelect
          name="typeLicenseId"
          value={form?.typeLicenseId}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup>
        <label>N° Documento <b className="text-danger">*</b></label>
        <Input type="text"
          name="resolution"
          value={form?.resolution || ''}
          onChange={({ target }) => onChange(target)}
          disabled={isDisabled}
        />
      </FormGroup>

      <FormGroup>
        <label>Fecha de Documento <b className="text-danger">*</b></label>
        <Input type="date"
          name="dateOfResolution"
          value={form?.dateOfResolution || ''}
          onChange={({ target }) => onChange(target)}
          disabled={isDisabled}
        />
      </FormGroup>

      <FormGroup>
        <label>Fecha de Inicio <b className="text-danger">*</b></label>
        <Input type="date"
          name="dateOfAdmission"
          value={form?.dateOfAdmission || ''}
          onChange={({ target }) => onChange(target)}
          disabled={isDisabled}
        />
      </FormGroup>

      <FormGroup>
        <label>Fecha de Termino <b className="text-danger">*</b></label>
        <Input type="date"
          name="terminationDate"
          value={form?.terminationDate || ''}
          onChange={({ target }) => onChange(target)}
          disabled={isDisabled}
        />
      </FormGroup>

      <FormGroup>
        <label>Dias usados</label>
        <Input type="number"
          name="daysUsed"
          value={form?.daysUsed || 0}
          readOnly
        />
      </FormGroup>

      <FormGroup>
        <label>Descripción</label>
        <Input type="textarea"
          name="description"
          value={form?.description || ''}
          onChange={({ target }) => onChange(target)}
          disabled={isDisabled}
        />
      </FormGroup>

      <FormGroup>
        <label>Con gose de haber</label>
        <div>
          <Toggle name="isPay"
            isDisabled={isDisabled}
            isChecked={form?.isPay || false}
            onChange={({ target }) => onChange({
              name: target.name,
              value: target.checked
            })}
          />
        </div>
      </FormGroup>
    </Form>
  )
}