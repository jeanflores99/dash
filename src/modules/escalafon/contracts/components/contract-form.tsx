import { IInputHandle } from '@common/dtos/input-handle';
import { SelectBasic } from '@common/select/select-basic';
import { DependencySelect } from '@modules/auth/dependencies/components/dependency-select';
import { ProfileSelect } from '@modules/escalafon/profiles/components/profile-select';
import { TypeCategorySelect } from '@modules/escalafon/type-categories/components/type-category-select';
import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { MapPin } from 'react-feather';
import { HourhandSelect } from '@modules/escalafon/hourhands/components/hourhand-select';
import { Dropzone } from '@common/dropzone';
import { ICreateContractDto } from '../dtos/create-contract.dto';
import { Show } from '@common/show';

interface IProps<T> {
  form: T,
  isEdit?: boolean,
  // eslint-disable-next-line no-unused-vars
  onChange: (input: IInputHandle) => void
}

export const ContractForm = ({ form, isEdit, onChange }: IProps<ICreateContractDto>) => {

  const handleChangeStatus = (files: File[]) => {
    const [file] = files;
    return onChange({ name: 'file', value: file });
  }

  return (
    <Form>
      <FormGroup>
        <label>Código de AIRHSP</label>
        <Input type='text'
          name="codeAIRHSP"
          value={form?.codeAIRHSP || ''}
          onChange={({ target }) => onChange(target)}
        />
      </FormGroup>

      <FormGroup>
        <label>Resolución <b className="text-danger">*</b></label>
        <Input type='text'
          name="resolution"
          value={form?.resolution}
          onChange={({ target }) => onChange(target)}
        />
      </FormGroup>

      <FormGroup>
        <label>Fecha de Resolución <b className="text-danger">*</b></label>
        <Input type='date'
          name="dateOfResolution"
          value={form?.dateOfResolution}
          onChange={({ target }) => onChange(target)}
        />
      </FormGroup>

      <FormGroup>
        <label>Fecha de Ingreso <b className="text-danger">*</b></label>
        <Input type='date'
          name="dateOfAdmission"
          value={form?.dateOfAdmission}
          onChange={({ target }) => onChange(target)}
        />
      </FormGroup>

      <FormGroup>
        <label>Fecha de Cese</label>
        <Input type='date'
          name="terminationDate"
          value={form?.terminationDate || ''}
          onChange={({ target }) => onChange(target)}
        />
      </FormGroup>

      <FormGroup>
        <label>Tip. Categoría <b className="text-danger">*</b></label>
        <TypeCategorySelect
          name='typeCategoryId'
          value={form?.typeCategoryId || ''}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup>
        <label>Condición <b className="text-danger">*</b></label>
        <SelectBasic
          name="condition"
          value={form?.condition || ''}
          onChange={onChange}
          options={[
            { label: "Contratado", value: "CONTRATADO" },
            { label: "Nombrado", value: "NOMBRADO" }
          ]}
        />
      </FormGroup>

      <FormGroup>
        <label>Ley</label>
        <Input type='text'
          name="ley"
          value={form?.ley || ''}
          onChange={({ target }) => onChange(target)}
        />
      </FormGroup>

      <FormGroup>
        <label>Plaza</label>
        <Input type='text'
          name="plaza"
          value={form?.plaza || ''}
          onChange={({ target }) => onChange(target)}
        />
      </FormGroup>

      <FormGroup>
        <label>Observación</label>
        <Input type='textarea'
          name="observation"
          value={form?.observation || ''}
          onChange={({ target }) => onChange(target)}
        />
      </FormGroup>

      <Show condition={isEdit ? false : true}>
        <FormGroup>
          <label>Archivo</label>
          <Dropzone
            multiple={false}
            onFiles={handleChangeStatus}
            title="Archivo Pdf, Docx y Doc"
            files={form?.file ? [form?.file] : []}
            accept='application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          />
        </FormGroup>
      </Show>

      <div>
        <hr />
        <MapPin size={17}/> <b>Entorno de Trabajo</b>
        <hr />
      </div>

      <FormGroup>
        <label>Dependencia <b className="text-danger">*</b></label>
        <DependencySelect
          name='dependencyId'
          value={form?.dependencyId || ''}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup>
        <label>Perfil Laboral <b className="text-danger">*</b></label>
        <ProfileSelect
          name='profileId'
          value={form?.profileId || ''}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup>
        <label>Horario <b className="text-danger">*</b></label>
        <HourhandSelect
          name='hourhandId'
          value={form?.hourhandId || ''}
          onChange={onChange}
        />
      </FormGroup>
    </Form>
  )
}