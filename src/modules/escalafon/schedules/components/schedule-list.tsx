/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { FullCalendar } from "@common/fullcalendar";
import { DateClickArg } from "@fullcalendar/interaction";
import { CalendarApi, EventClickArg, EventInput } from "@fullcalendar/react";
import { RootState } from "@store/store";
import { plainToClass } from "class-transformer";
import { useDispatch, useSelector } from "react-redux";
import { getSchedulesToContract } from "../apis";
import { IScheduleEntity } from "../dtos/schedule.entity";
import { ScheduleSerialize } from "../serializers/schedule.serialize";
import { scheduleActions } from "../store";
import { ScheduleEdit } from "./schedule-edit";

interface IProps {
  onCreate: (args: DateClickArg) => void
}

export const ScheduleList = ({ onCreate }: IProps) => {

  const calendarRef = useRef(null);

  const dispatch = useDispatch();
  const { option } = useSelector((state: RootState) => state.schedule);
  const { contract } = useSelector((state: RootState) => state.contract);

  const [, setLoading] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [perPage] = useState<number>(100);
  const [page] = useState<number>(1);
  const [querySearch,] = useState<string>("");
  const [, setIsError] = useState<boolean>(false);

  const handleCalendar = useCallback((info: any, success: any) => {
    setIsRefresh(true);
    return success([])
  }, [calendarRef])

  const handleEdit = async ({ event }: EventClickArg) => {
    dispatch(scheduleActions.setSchedule(event.extendedProps as any));
    dispatch(scheduleActions.changeOption("EDIT"));
  }

  const formatterDate = (event: IScheduleEntity) => {
    const entryEvent = plainToClass(ScheduleSerialize, event);
    // response
    return {
      id: `${event.id}`,
      title: entryEvent.displayFormatter,
      start: event.date,
      allDay: true,
      className: entryEvent.displayBackground,
      borderColor: "transparent",
      extendedProps: event
    } as EventInput;
  }

  const handleData = async () => {
    const current = calendarRef?.current as any;
    const calendarApi: CalendarApi = current?._calendarApi;
    if (!current) return;
    setLoading(true);
    setIsError(false);
    // add year, month
    const date = calendarApi.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    // clear events
    calendarApi.removeAllEvents();
    // add
    await getSchedulesToContract(contract?.id || 0, {
      page,
      limit: perPage,
      year,
      month,
      querySearch
    }).then((data: ResponsePaginateDto<IScheduleEntity>) => {
      dispatch(scheduleActions.paginate(data));
      const { items } = data;
      const events:EventInput[] = [];
      items?.forEach(item => {
        const { exit } = item;
        // add events
        events.push(formatterDate(item));
        // add son
        if (exit) events.push(formatterDate(exit));
      })
      console.log(events);
      // add events
      calendarApi.addEventSource({ events });
    }).catch(() => setIsError(true))
    setLoading(false);
  }

  useEffect(() => {
    if (isRefresh) handleData();
  }, [isRefresh]);

  useEffect(() => {
    if (isRefresh) setIsRefresh(false);
  }, [isRefresh]);

  useEffect(() => {
    if (option == "REFRESH") {
      setIsRefresh(true);
    }
  }, [option]);

  useEffect(() => {
    if (option == "REFRESH") {
      dispatch(scheduleActions.changeOption(""));
    }
  }, [option]);

  return (
    <>
      <FullCalendar
        dateClick={onCreate}
        myRef={calendarRef}
        events={handleCalendar as any}
        eventClick={handleEdit}
      />
      {/* editar */}
      <ScheduleEdit isOpen={option == "EDIT"}
        onClose={() => dispatch(scheduleActions.changeOption(""))}
        onSave={() => dispatch(scheduleActions.changeOption("REFRESH"))}
        onDelete={() => dispatch(scheduleActions.changeOption("REFRESH"))}
      />
    </>
  )
}