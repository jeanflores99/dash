/* eslint-disable no-unused-vars */
import { IInputHandle } from "@common/dtos/input-handle"
import { Button, Form, FormGroup, Input } from "reactstrap"
import { IFamilyFormDto } from "../dtos/family-form.dto"
import { PersonSearchSelect } from '@modules/auth/person/components/person-search-select';
import { SelectBasic } from "@common/select/select-basic";
import { Show } from "@common/show";
import { PersonEntity } from "@modules/auth/person/dtos/person.entity";
import { RefreshCw } from "react-feather";

interface IProps {
  form: IFamilyFormDto,
  isEdit?: boolean,
  onChange: (input: IInputHandle) => void,
  onAddPerson: (person: PersonEntity) => void,
  onRemovePerson: () => void
}

export const FamilyForm = ({ form, onChange, onAddPerson, onRemovePerson }: IProps) => {

  return (
    <Form>
      <Show condition={form?.personId ? true : false}
        isDefault={
          <FormGroup>
            <label>Seleccionar Persona</label>
            <PersonSearchSelect onAdd={onAddPerson}/>
          </FormGroup>
        }
      >
        <FormGroup>
          <label>Nombre completo</label>
          <Input type="text"
            className="uppercase"
            value={form?.person?.fullName || ''}
            readOnly
          />
        </FormGroup>

        <FormGroup>
          <label>Tipo Documento</label>
          <Input type="text"
            value={form?.person?.documentType?.name || ''}
            readOnly
          />
        </FormGroup>

        <FormGroup>
          <label>N° Documento</label>
          <Input type="text"
            value={form?.person?.documentNumber || ''}
            readOnly
          />
        </FormGroup>

        <div className="mb-3">
          <Button outline
            onClick={onRemovePerson}
          >
            <RefreshCw className="icon"/>
          </Button>
        </div>
      </Show>

      <FormGroup>
        <label>Tipo de familiar</label>
        <SelectBasic
          name="mode"
          value={form?.mode}
          placeholder="Tipo"
          options={[
            { label: 'Cónyuge', value: "PARENT" },
            { label: 'Hijo', value: "CHILD" }
          ]}
          onChange={onChange}
        />
      </FormGroup>
    </Form>
  )
}