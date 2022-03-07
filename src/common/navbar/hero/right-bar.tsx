import React from 'react';
import { NotifyBar } from './notify-bar';
import { UserBar } from './user-bar';
import { Maximize } from 'react-feather';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { useDarkTheme } from '@common/hooks/useDarkTheme';

export const RightBar = () => {

  const darkTheme = useDarkTheme();

  // redux
  const { dark } = useSelector((state: RootState) => state.screen);

  return (
    <div className="nav-right col-8 pull-right right-header p-0">
      <ul className="nav-menus">
        {/* notify */}
        <NotifyBar />
        {/* toggle theme */}
        <li>
          <div className="mode" onClick={darkTheme.toggle}>
              <i className={`fa ${dark ? 'fa-lightbulb-o' : 'fa-moon-o'}`}></i>
          </div>
        </li>
        <li className="maximize">
          <a className="text-dark" href="#!" >
            <Maximize/>
          </a>
        </li>
        {/* user bar */}
        <UserBar/>
      </ul>
    </div>
  )
}