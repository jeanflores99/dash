import React from 'react';
import Head from 'next/head';
import { Container } from 'reactstrap';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
const ScreenWrapper = dynamic(() => import('./screen-wrapper'), {
  ssr: false
});

interface TPropsGuest {
  children: any
}

const GuestLayout = (props: TPropsGuest) => {

  const { title } = useSelector((state: RootState) => state.screen);

  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i&amp;display=swap"/>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900&amp;display=swap"/>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
        <title>{title}</title>
      </Head>
      {/* contenido */}
      <ScreenWrapper>
        <Container fluid={true} className="p-0 bg-white">
          {props.children || null}
        </Container>
      </ScreenWrapper>
    </>
  )
}

export default GuestLayout;