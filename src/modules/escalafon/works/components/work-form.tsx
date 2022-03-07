import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import Toggle from '@atlaskit/toggle';
import { AfpSelect } from '@modules/escalafon/afps/components/afp-select';
import { InputDto } from '@services/dtos';
import { ICreateWorkDto } from '../dtos/create-work.dto';

interface IProps {
  form: ICreateWorkDto,
  disabled?: boolean,
  // eslint-disable-next-line no-unused-vars
  onChange: (input: InputDto) => void
}

export const WorkForm = ({ form, disabled, onChange }: IProps) => {

  const handleChange = (inputObj: InputDto) => {
    if (typeof onChange == 'function') {
      onChange(inputObj);
    }
  }

  return (
    <Form>
      <FormGroup>
        <label>Fecha de ingreso <b className="text-danger">*</b></label>
        <Input type='date'
          name="dateOfAdmission"
          value={form?.dateOfAdmission || ''}
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <label>Ley social <b className="text-danger">*</b></label>
        <AfpSelect
          name='afpId'
          value={form?.afpId}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <label>Fecha de Afiliación</label>
        <Input type='date'
          name="affiliationOfDate"
          value={form.affiliationOfDate || ''}
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <label>N° de CUSSP</label>
        <Input type='text'
          name="numberOfCussp"
          value={form?.numberOfCussp || ''}
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <label>Prima de seguro</label>
        <div>
          <Toggle name="isPrimaSeguro"
            isDisabled={disabled}
            isChecked={form?.isPrimaSeguro || false}
            onChange={({ target }) => handleChange({
              name: target.name,
              value: target.checked
            })}
          />
        </div>
      </FormGroup>
      <FormGroup>
        <label>N° Essalud</label>
        <Input type='text'
          name="numberOfEssalud"
          value={form?.numberOfEssalud || ''}
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
    </Form>
  )
}