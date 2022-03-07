import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { InputDto } from '@services/dtos';
import { ICreatePerson } from '../dtos/create-person.dto';
import { PersonMaritalStatus } from '../dtos/person.entity';
import { SelectBasic } from '@common/select/select-basic';
import { PhoneCall } from 'react-feather';
import { BadgeSelect } from '@common/badges/components/badge-select'

interface IProps {
  form: ICreatePerson,
  disabled?: boolean,
  // eslint-disable-next-line no-unused-vars
  onChange: (input: InputDto) => void
}

export const PersonForm = ({ form, disabled, onChange }: IProps) => {

  const handleChange = (inputObj: InputDto) => {
    if (typeof onChange == 'function') {
      onChange(inputObj);
    }
  }

  const optionsMarital = [
    { label: "Casado(a)", value: PersonMaritalStatus.C },
    { label: "Divorciado(a)", value: PersonMaritalStatus.D },
    { label: "Soltero(a)", value: PersonMaritalStatus.S },
    { label: "Viudo(a)", value: PersonMaritalStatus.V }
  ];

  const optionsDocuments = [
    { label: "DNI/LE", value: "01" },
    { label: "Pasaporte", value: "02" },
    { label: "Cédula", value: "03" },
    { label: "RUC", value: "04" }
  ];

  const optionsGender = [
    { label: "Hombre", value: "M" },
    { label: "Mujer", value: "F" }
  ];

  return (
    <Form>
      <FormGroup>
        <label>Prefijo <b className="text-danger">*</b></label>
        <Input type='text'
          name="prefix"
          value={form?.prefix || ''}
          placeholder="Sr"
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <label>Nombres <b className="text-danger">*</b></label>
        <Input type='text'
          name="name"
          value={form?.name || ''}
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <label>Apellido Paterno <b className="text-danger">*</b></label>
        <Input type='text'
          name="lastname"
          value={form?.lastname || ''}
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <label>Apellido Materno <b className="text-danger">*</b></label>
        <Input type='text'
          name="secondaryName"
          value={form?.secondaryName || ''}
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <label>Tip. Documento <b className="text-danger">*</b></label>
        <SelectBasic
          options={optionsDocuments}
          name="documentTypeId"
          value={form?.documentTypeId || ''}
          onChange={(obj) => handleChange(obj)}
        />
      </FormGroup>
      <FormGroup>
        <label>N° Documento <b className="text-danger">*</b></label>
        <Input type='text'
          name="documentNumber"
          value={form?.documentNumber || ''}
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <label>Lugar de Nacimiento <b className="text-danger">*</b></label>
        <BadgeSelect
          name="badgeId"
          defaultQuerySearch={form?.badgeId}
          value={form?.badgeId || ''}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <label>Fecha de Nacimiento <b className="text-danger">*</b></label>
        <Input type='date'
          name="dateOfBirth"
          value={form?.dateOfBirth || ''}
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <label>Sexo <b className="text-danger">*</b></label>
        <SelectBasic
          options={optionsGender}
          name="gender"
          value={form?.gender || ''}
          onChange={(obj) => handleChange(obj)}
        />
      </FormGroup>
      <FormGroup>
        <label>Estado Civil <b className="text-danger">*</b></label>
        <SelectBasic
          options={optionsMarital}
          name="maritalStatus"
          value={form?.maritalStatus || ''}
          onChange={(obj) => handleChange(obj)}
        />
      </FormGroup>

      <div>
        <hr />
        <PhoneCall size={15} className="mr-2"/> Datos de contato
        <hr />
      </div>

      <FormGroup>
        <label>N° Telefónico</label>
        <Input type='text'
          name="phone"
          value={form?.phone || ''}
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <label>Correo Electrónico</label>
        <Input type='text'
          name="emailContact"
          value={form?.emailContact || ''}
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <label>Dirección</label>
        <Input type='textarea'
          name="address"
          value={form?.address || ''}
          onChange={({ target }) => handleChange(target)}
          disabled={disabled}
        />
      </FormGroup>
    </Form>
  )
}