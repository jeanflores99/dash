import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { ChevronUp } from 'react-feather';
import Footer from '@common/footer';
import { NavbarHero } from '../../navbar/hero';
import { SidebarHero } from '@common/sidebar/hero';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
const ScreenWrapper = dynamic(() => import('./screen-wrapper'), {
  ssr: false
});

interface TPropsAuth {
  children: any
}

const AuthLayout = (props: TPropsAuth) => {

  const { title } = useSelector((state: RootState) => state.screen);

  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i&amp;display=swap" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900&amp;display=swap" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
        <title>{title}</title>
      </Head>
      <ScreenWrapper>
        {/* <!-- tap on top starts--> */}
        <div className="tap-top">
          <ChevronUp />
        </div>
        {/* <!-- page-wrapper Start--> */}
        <div className="page-wrapper compact-wrapper" id="pageWrapper">
          <NavbarHero />
          {/* <!-- Page Body Start--> */}
          <div className="page-body-wrapper horizontal-menu">
            {/* <!-- Page Sidebar Start--> */}
            <SidebarHero />
            {/* <!-- Page Sidebar Ends--> */}
            <div className="page-body">
              <div className="container-fluid">
                {props.children || null}
              </div>
            </div>
            {/* <!-- footer start--> */}
            <Footer />
          </div>
        </div>
      </ScreenWrapper>
    </>
  )
}

export default AuthLayout;