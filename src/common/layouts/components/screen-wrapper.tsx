import useScreen from '../hooks/useScreen';
import React from 'react';

interface IProps {
  children: any
}

const ScreenWrapper = ({ children }: IProps) => {

  useScreen();

  return (
    <>
      {children}
    </>
  );
}

export default ScreenWrapper;