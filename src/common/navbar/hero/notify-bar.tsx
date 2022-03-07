import React from 'react';
import { Bell } from 'react-feather'

export const NotifyBar = () => {

    return (
        <li className="onhover-dropdown">
            <div className="notification-box">
                <Bell/> <span className="badge rounded-pill badge-secondary">4</span>
            </div>
            <ul className="notification-dropdown onhover-show-div">
            <li>
                <Bell/> <h6 className="f-18 mb-0">Notificaciones</h6>
            </li>
            <li>
                <p><i className="fa fa-circle-o me-3 font-primary"> </i>Delivery processing <span className="pull-right">10 min.</span></p>
            </li>
            <li>
                <p><i className="fa fa-circle-o me-3 font-success"></i>Order Complete<span className="pull-right">1 hr</span></p>
            </li>
            <li>
                <p><i className="fa fa-circle-o me-3 font-info"></i>Tickets Generated<span className="pull-right">3 hr</span></p>
            </li>
            <li>
                <p><i className="fa fa-circle-o me-3 font-danger"></i>Delivery Complete<span className="pull-right">6 hr</span></p>
            </li>
            <li><a className="btn btn-primary" href="#" >Check all notification</a></li>
            </ul>
        </li>
    )
}