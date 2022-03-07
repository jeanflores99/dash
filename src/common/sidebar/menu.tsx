/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from 'react';
import { IBodyMenu, IItemMenu, sidebarData } from './data';
import Link from 'next/link';
import { Key } from 'react-feather';

interface IPropsItemMenu {
  onToggle?: (indexParent: number,
    index: number, active: boolean) => void
  indexParent: number
  index: number
  data: IItemMenu
}

const MenuItem = ({ indexParent, index, data, onToggle }: IPropsItemMenu) => {

  const handleOnToggle = (e: any) => {
    e.preventDefault();
    if (typeof onToggle == 'function') {
      onToggle(indexParent, index, !data.active);
    }
  }

  if (data.type == 'sub') return (
    <>
      <a href="#"
        key={index}
        onClick={handleOnToggle}
        className={`sidebar-link sidebar-title ${data.active ? 'active' : ''}`}
      >
        <data.icon />
        <span>{data.title}</span>
        {data.badge ? <label className={data.badge}>{data.badgetxt}</label> : ""}
        <div className="according-menu">
          {data.active
            ? <i className="fa fa-angle-down"></i>
            : <i className="fa fa-angle-right"></i>
          }
        </div>
      </a>
      {/* childrens */}
      <ul className="nav-sub-childmenu submenu-content"
        style={{ display: data.active ? "block" : "none" }}
      >
        {data.children?.map((child, key) =>
          <li key={key} className="sidebar-main-title">
            {(child.type === 'link') ?
              <Link href={child.path}>
                <a className={`lan-4 ${child.active ? 'active' : ''}`}>
                  {child.title}
                </a>
              </Link>
              : ''}
          </li>
        )}
      </ul>
    </>
  )

  return null;
}

export const Menu = () => {

  const [menuData, setMenuData] = useState(sidebarData);

  const toggle = (indexParent: number,
    index: number, active: boolean) => {
    const currentData = [...sidebarData];
    currentData.map((module, indexM) => {
      if (indexM != indexParent) return module;
      // items
      const items = module.items.map((item, indexI) => {
        if (indexI != index) return item;
        return { ...item, active }
      })
      // response
      return Object.assign(module, { items });
    })
    // setting
    setMenuData(currentData);
  }

  return (
    <>
      {menuData.map((data: IBodyMenu, index: number) =>
        <Fragment key={index}>
          <li className="sidebar-main-title"
            key={`item-list-parent-${index}`}
          >
            <div>
              <h6 className="lan-1">{data.menuTitle}</h6>
              <p className="lan-2">{data.menuContent}</p>
            </div>
          </li>
          {/* children */}
          {data.items?.map((item, indexI: number) =>
            <li className="sidebar-list" key={`item-sidebar-list-${indexI}`}>
              <MenuItem data={item}
                index={indexI}
                indexParent={index}
                onToggle={toggle}
              />
            </li>
          )}
        </Fragment>
      )}
    </>
  )
}