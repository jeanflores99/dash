import React from 'react';
import { User, Settings, LogOut } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Show } from '@common/show';
import { RootState } from 'src/store/store';
import Image from 'next/image';
import UserDefault from 'src/assets/images/user.jpg';
import { logout } from '@common/store/auth.thunk';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export const UserBar = () => {

  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();

  const router = useRouter();

  const options = [
    {
      key: "account",
      url: "/",
      text: "Cuenta",
      icon: <User />
    },
    {
      key: "setting",
      text: "Config",
      icon: <Settings />
    },
    {
      key: "logout",
      text: "Salir",
      icon: <LogOut />,
      onClick: () => {
        dispatch(logout())
        Cookies.remove("AccessToken");
        router.push("/sign-in");
      }
    },
  ]

  return (
    <li className="profile-nav onhover-dropdown p-0 me-0">
      <div className="media profile-media">
        <Image alt="perfil"
          className="b-r-10"
          width={"35px"}
          height={"35px"}
          objectFit='cover'
          src={UserDefault}
        />
        <div className="media-body">
          <span>{user?.username || 'Jean'}</span>
          <p className="mb-0 font-roboto">
            {user?.role?.name || 'User'} <i className="middle fa fa-angle-down"></i>
          </p>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        {options?.map((opt, index) =>
          <li key={`item-menu-user-${index}`}
            onClick={opt?.onClick || undefined}
          >
            <Show condition={typeof opt.url !== 'undefined'}
              isDefault={
                <a href="#">
                  {opt?.icon} <span>{opt?.text} </span>
                </a>
              }
            >
              <Link href={`${opt.url}`}>
                <a>{opt?.icon} <span>{opt?.text} </span></a>
              </Link>
            </Show>
          </li>
        )}
      </ul>
    </li>
  )
}