import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';
import { getPeople } from '../apis';
import { PersonEntity } from '../dtos/person.entity';
import { Plus } from 'react-feather';
import { PersonCreate } from './person-create';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onAdd: (person: PersonEntity) => void
}

export const PersonSearchSelect = ({ onAdd }: IProps) => {

  const [people, setPeople] = useState<PersonEntity[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const [option, setOption] = useState<string | undefined>(undefined);

  const switchOptions = {
    CREATE: "CREATE"
  }

  const displayText = (person: PersonEntity) => {
    return `${person.fullName || ''}`;
  }

  const handleSearch = async (value: string) => {
    if (value.length > 3) {
      setIsOpen(true);
      setPending(true)
      await getPeople({ page: 1, querySearch: value })
        .then(({ items }) => setPeople(items))
        .catch(err => console.log(err))
    } else setPeople([])
    // quitar dialog
    if (!value) setIsOpen(false);
    // quitar pending
    setPending(false);
  }

  const handleAdd = async (person: PersonEntity) => {
    setIsOpen(false);
    if (typeof onAdd == 'function') onAdd(person);
  }

  const handleSave = (person: PersonEntity) => {
    setOption(undefined)
    handleSearch(`${person.name} ${person.lastname}`);
  }

  const ComponentAddPeople = (
    <div className='text-center'>
      No hay regístros
      <div className='text-center mt-2'>
        <Button
          color='primary'
          outline
          onClick={() => setOption(switchOptions.CREATE)}
        >
          <Plus size={15}/>
        </Button>
      </div>
    </div>
  )

  const ComponentDialog = () => {
    if (!isOpen) return null;
    return (
      <div className='dropdown-body card card-body'>
        {people?.map(person => 
          <div key={`item-search-${person.id}`}
            className="capitalize cursor-pointer dropdown-item"
            onClick={() => handleAdd(person)}
          >
            <span className='badge badge-primary mr-2'>
              {person?.documentNumber}
            </span>
            <span className='capitalize'>{displayText(person)}</span>
          </div>  
        )}
        {/* loading */}
        <span className='text-center'>
          {pending ? 'Buscando...' : ''}
        </span>
        {/* no hay datos */}
        <span className='text-center'>
          {!pending && !people.length ? ComponentAddPeople : ''}
        </span>
      </div>
    )
  }

  return (
    <div className='dropdown-content'>
      <Input type="text"
        placeholder='buscar...'
        onChange={({ target }) => handleSearch(target.value)}
      />
      {ComponentDialog()}
      {/* crear persona */}
      {option == switchOptions.CREATE
        ? <PersonCreate
            onClose={() => setOption(undefined)}
            onSave={handleSave}
          />
        : null}
    </div>
  )
}