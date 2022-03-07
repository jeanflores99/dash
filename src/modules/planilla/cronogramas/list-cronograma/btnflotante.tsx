import React from 'react'
import Router from 'next/router'
import { Plus } from 'react-feather';

class Props {
  push: string = "/"
}

const Btnflotante = ({ push }: Props = new Props) => {
  return (
    <>
      <button
        type='button'
        onClick={() => Router.push({ pathname: push })}
        className="btn-float"
      >
        <i className="fa fa-plus"></i>
      </button >
    </>
  )
}

export default Btnflotante

