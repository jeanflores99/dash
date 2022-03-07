/* eslint-disable no-unused-vars */
import React, { MutableRefObject } from 'react';
import Calendar, { CalendarOptions } from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import { omit } from 'lodash';

interface IProps extends CalendarOptions {
  myRef: MutableRefObject<any>
}

export const FullCalendar = (props: IProps) => {

  const ref = props.myRef;
  const datos = omit(props, "myRef");

  return (
    <Calendar
      plugins={[dayGridPlugin, interactionPlugin]}
      locale={esLocale}
      ref={ref}
      {...datos}
    />
  )
}