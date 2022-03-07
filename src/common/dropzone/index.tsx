/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import prettyBytes from 'pretty-bytes';
import { UploadCloud, File as F, X } from 'react-feather';

interface IProps {
  title?: string
  accept?: string
  multiple: boolean
  onFiles: (files: File[]) => void,
  files: File[]
}

interface IPropsItem {
  file: File
  onDelete: () => void
}

const InfoFile = ({ file, onDelete }: IPropsItem) => (
  <div className='dz-preview dz-file-preview dz-processing'
    onClick={() => null}
  >
    <div className='dz-error-mark'>
      <div className='text-center'><b>{prettyBytes(file?.size)}</b></div>
      <div className='text-center mt-2'>
        <F size={30} />
      </div>
      <div className='text-center'>{file?.name}</div>
    </div>
    {/* close */}
    <span className="close">
      <X size={15}
        color="red"
        className='cursor-pointer'
        onClick={onDelete}
      />
    </span>
  </div>
)

export const Dropzone = ({ title, accept, multiple, files, onFiles }: IProps) => {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (typeof onFiles == 'function') onFiles(
      multiple ? [...files, ...acceptedFiles] : acceptedFiles
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept, multiple: multiple
  })

  const handleDelete = (index: number) => {
    const newFiles = [...files];
    const results = newFiles.filter((f, i) => i !== index);
    if (typeof onFiles == 'function') onFiles(results);
  }

  const InfoDrop = (
    <>
      <UploadCloud color='#7366ff' size={30} />
      <h6>{title}</h6>
      <span className='needsclick'>{isDragActive
        ? "Suelta tus archivos aquí..."
        : "Arrastra o selecciona tus archivos aquí"}
      </span>
    </>
  )

  return (
    <div className='dropzone dz-clickable'>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className='dz-message needsclick'>
          {InfoDrop}
        </div>
      </div>
      {/* archivos */}
      {files?.map((f, index) =>
        <InfoFile
          key={`item-file-${index}`}
          file={f}
          onDelete={() => handleDelete(index)}
        />
      )}
    </div>
  )
}