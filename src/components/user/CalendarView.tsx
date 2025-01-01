import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useAppStore } from '../../store';

export function CalendarView() {
  const communications = useAppStore((state) => state.communications);
  const companies = useAppStore((state) => state.companies);
  const methods = useAppStore((state) => state.communicationMethods);

  const events = communications.map(comm => {
    const company = companies.find(c => c.id === comm.companyId);
    const method = methods.find(m => m.id === comm.methodId);
    
    return {
      title: `${company?.name} - ${method?.name}`,
      date: comm.date,
      extendedProps: {
        notes: comm.notes,
      },
    };
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={(eventInfo) => (
          <div className="p-1">
            <div className="text-xs font-medium">{eventInfo.event.title}</div>
            {eventInfo.event.extendedProps.notes && (
              <div className="text-xs text-gray-500 truncate">
                {eventInfo.event.extendedProps.notes}
              </div>
            )}
          </div>
        )}
        height="auto"
      />
    </div>
  );
}