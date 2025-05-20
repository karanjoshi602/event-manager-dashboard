'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
};

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Event>>({});

  const fetchEvents = async () => {
    const res = await fetch('http://localhost:5000/api/events');
    const data = await res.json();
    setEvents(data);
  };

  const deleteEvent = async (id: number) => {
    const res = await fetch(`http://localhost:5000/api/events/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Event deleted');
      fetchEvents();
    } else {
      toast.error('Delete failed');
    }
  };

  const startEdit = (event: Event) => {
    setEditingId(event.id);
    setEditData(event);
  };

  const saveEdit = async () => {
    const { title, description, date, location } = editData;
    if (!title || !description || !date || !location) {
      toast.error('All fields required');
      return;
    }

    const res = await fetch(`http://localhost:5000/api/events/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    });

    if (res.ok) {
      toast.success('Event updated');
      setEditingId(null);
      fetchEvents();
    } else {
      toast.error('Update failed');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">All Events</h2>
      <div className="flex overflow-x-auto space-x-4 p-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="min-w-[300px] bg-white p-4 rounded-xl shadow-md flex flex-col justify-between"
          >
            {editingId === event.id ? (
              <>
                <input
                  className="mb-2 px-2 py-1 border rounded"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
                <textarea
                  className="mb-2 px-2 py-1 border rounded"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                />
                <input
                  type="datetime-local"
                  className="mb-2 px-2 py-1 border rounded"
                  value={editData.date}
                  onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                />
                <input
                  className="mb-2 px-2 py-1 border rounded"
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                />
                <button
                  className="bg-green-600 hover:bg-green-700 text-white py-1 rounded mb-2"
                  onClick={saveEdit}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h3 className="text-md font-bold text-indigo-600">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.description}</p>
                <div className="text-xs mt-2 text-gray-500">
                  📍 {event.location} | 📅 {new Date(event.date).toLocaleString()}
                </div>
                <div className="flex mt-3 gap-2">
                  <button
                    onClick={() => startEdit(event)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
