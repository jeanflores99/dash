import React from 'react';
import { Button } from 'reactstrap';

interface IProps {
  icon: any
  color?: string
  onClick: () => void
}

export const FloatButton = ({ icon, color, onClick }: IProps) => {
  return (
    <Button color={color || 'secundary'}
      className='float-button cursor-pointer'
      onClick={onClick}
    >
      {icon}
    </Button>
  )
}