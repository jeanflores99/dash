import React from 'react';

interface IProps {
  children: any
}

export const FileContent = ({ children }: IProps) => {
  return (
    <div className='file-content'>
      <div className='file-manager'>
        <div className="files">
          {children || null}
        </div>
      </div>
    </div>
  )
}