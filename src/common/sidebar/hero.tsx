import React, { Fragment } from 'react';
import { ArrowRight, ArrowLeft, Grid, Home } from 'react-feather';
import Link from 'next/link'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { wrapperScreen } from '@common/store/screen.thunk';
import { Show } from '@common/show'
import { RootState } from '@store/store';
import { Menu } from './menu';

export const SidebarHero = () => {
  // redux
  const dispatch = useDispatch()
  const { wrapper, dark } = useSelector((store: RootState) => store.screen);

  const handleWrapperScreen = () => dispatch(wrapperScreen())

  return (
    <Fragment>
      <div className={`bg-overlay1`}></div>
      <div className={`sidebar-wrapper ${wrapper ? 'close_icon' : ''}`} id="sidebar-wrapper">
        <div className="logo-wrapper">
          <Link href="/">
            <a>
              <Show condition={dark}
                isDefault={
                  <Image src={require("../../assets/images/logo/newlogo.png")} alt="" />
                }
              >
                {/* <Home className="img-fluid for-dark" /> */}
                <Image className="img-fluid for-dark" src={require("../../assets/images/logo/newlogo_dark.png")} alt="" />

              </Show>
            </a>
          </Link>
          <div className="back-btn cursor-pointer" onClick={handleWrapperScreen}><i className="fa fa-angle-left"></i></div>
          <div className="toggle-sidebar" onClick={handleWrapperScreen}>
            <Grid className="status_toggle middle sidebar-toggle" />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link href="/">
            <a><Home /></a>
            {/* <a><Image className="" src={require("../../assets/images/logo/logo-icon.png")} alt="" /></a> */}
          </Link>
        </div>
        <nav className="sidebar-main" id="sidebar-main">
          <div className="left-arrow"><ArrowLeft /></div>
          <div id="sidebar-menu" style={{ marginLeft: "0px" }}>
            <ul className="sidebar-links custom-scrollbar">
              <li className="back-btn">
                <div className="mobile-back text-right"><span>{"Back"}</span><i className="fa fa-angle-right pl-2" aria-hidden="true"></i></div>
              </li>
              {/* iter menu */}
              <Menu />
            </ul>
          </div>
          <div className="right-arrow"><ArrowRight /></div>
        </nav>
      </div>
    </Fragment >
  );
}