// frontend/app/components/EventDashboard.tsx

'use client';

import { useState } from 'react';
import EventForm from './EventForm';
import EventList from './EventList';

export default function EventDashboard() {
  const [refresh, setRefresh] = useState(false);

  const handleEventCreated = () => {
    setRefresh(!refresh); // Toggle to trigger re-fetch
  };

  return (
    <>
      <EventForm onEventCreated={handleEventCreated} />
      <EventList key={refresh.toString()} />
    </>
  );
}
