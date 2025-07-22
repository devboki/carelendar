import { useEffect, useState } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import type { DateClickArg } from '@fullcalendar/interaction';
import type { EventClickArg } from '@fullcalendar/core';
import type { EventInput } from '@fullcalendar/core';

import axios from 'axios';

import ScheduleModal from '../pages/ScheduleModal';

interface ScheduleEvent {
  id?: number;
  petId?: number;
  title: string;
  start: Date | string;
  end: Date | string;
  description?: string;
}

interface MyCalendarProps {
  refreshKey: number;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
  petId?: number;
}

function MyCalendar({ refreshKey, setRefreshTrigger, petId }: MyCalendarProps) {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (!petId) {
          console.log('조회된 스케줄 없음.');
          return;
        }

        const url = petId
          ? `/api/pets/${petId}/schedules` 
          : `/api/schedules`;              
        const response = await axios.get<ScheduleEvent[]>(url);
        setEvents(response.data);
      } catch (error) {
        console.error('스케줄 조회 실패:', error);
      }
    };

    fetchSchedules();
  }, [refreshKey, petId]);

  const handleDateClick = (arg: DateClickArg) => {
    const dateStr = arg.dateStr;
    setSelectedEvent({
      title: '',
      start: dateStr,
      end: dateStr,
      description: '',
      petId: petId,
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEventClick = (info: EventClickArg) => {
    const event = info.event;
    setSelectedEvent({
      id: Number(event.id),
      title: event.title,
      start: event.start!,
      end: event.end!,
      description: event.extendedProps.description,
      petId: event.extendedProps.petId,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: ScheduleEvent) => {
    try {
      if (isEditMode && event.id) {
        await axios.put(`/api/schedules/${event.id}`, event);
      } else {
        await axios.post(`/api/schedules`, event);
      }
      setIsModalOpen(false);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('스케줄 저장 실패:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/schedules/${id}`);
      setIsModalOpen(false);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('스케줄 삭제 실패:', error);
    }
  };

  // FullCalendar가 요구하는 형식으로 변환
  const calendarEvents: EventInput[] = events.map((e) => ({
    id: e.id?.toString(),
    title: e.title,
    start: e.start,
    end: e.end,
    extendedProps: {
      description: e.description,
      petId: e.petId,
    },
  }));

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        locale="ko"
      />

      {isModalOpen && selectedEvent && (
        <ScheduleModal
          event={selectedEvent}
          isEditMode={isEditMode}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default MyCalendar;
