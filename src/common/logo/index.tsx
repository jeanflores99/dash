import React from 'react';
import styles from './Logo.module.scss';

interface IPropsLogo {
  urlImage?: string
}

export const Logo = (props: IPropsLogo) => {
  return (
    <div className={styles.logo__content}
      style={{ 
        backgroundImage: `url(${props.urlImage})`
      }}
    />
  )
}