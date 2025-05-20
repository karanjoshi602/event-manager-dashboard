'use client';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import { useState } from 'react';

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-indigo-100 text-gray-800 p-6">
      <h1 className="text-4xl font-bold text-center text-teal-600 mb-10 drop-shadow-lg">
        Event Manager Dashboard
      </h1>

      <div className="flex flex-col items-center space-y-10 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-10">
        <EventForm onCreate={() => setRefresh(!refresh)} />
        <EventList key={refresh.toString()} />
      </div>
    </main>
  );
}
