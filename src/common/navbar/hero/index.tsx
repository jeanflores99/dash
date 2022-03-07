import React, { useEffect } from 'react';
import { Menu } from 'react-feather';
import { wrapperScreen, defaultTheme } from '@common/store/screen.thunk';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import Image from 'next/image';
import { RightBar } from './right-bar';

export const NavbarHero = () => {

  const dispatch = useDispatch();
  const { wrapper } = useSelector((state: RootState) => state.screen);

  const handleWrapperScreen = () => dispatch(wrapperScreen());

  useEffect(() => {
    dispatch(defaultTheme())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={`page-header ${wrapper ? 'close_icon' : ''}`}>
      <div className="header-wrapper row m-0">
          <form className="form-inline search-full col" action="#" method="get">
            <div className="form-group w-100">
              <div className="Typeahead Typeahead--twitterUsers">
                  <div className="u-posRelative">
                    <span className="twitter-typeahead" style={{ position: "relative", display: "inline-block" }}></span>
                    <input className="demo-input Typeahead-input form-control-plaintext w-100 tt-hint"/>
                  
                    <div className="spinner-border Typeahead-spinner" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x close-search"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </div>
                  <div className="Typeahead-menu"><div className="tt-dataset tt-dataset-0"></div></div>
              </div>
            </div>
          </form>
          <div className="header-logo-wrapper col-auto p-0">
            <div className="logo-wrapper">
              <a href="index.html">
                <Image className="img-fluid"
                  src={require("src/assets/images/logo/logo_dark.png")}
                  alt=""
                />
              </a>
            </div>
            <div className="toggle-sidebar"
              onClick={handleWrapperScreen}
            >
              <Menu/>
            </div>
          </div>
          {/* navbar left */}
          <div className="left-header col horizontal-wrapper ps-0"></div>
          {/* navbar right */}
          <RightBar/>
        </div>
    </div>
  )
}