import React from 'react';
import { Phone } from 'react-feather';

export const FileItem = () => {
  return (
    <div className="file-box" style={{ width: "100%" }}>
      <div className="file-top">
        <Phone size={35}/>
        <i className="fa fa-ellipsis-v f-14 ellips"></i>
      </div>
      <div className="file-bottom">
        <h6>Archivo</h6>
        <p className="mb-1">2Mb</p>
        <p> <b>{"last open"} : </b>2min</p>
      </div>
    </div>
  )
}