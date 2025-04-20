

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/adminAppointmentsCalendar.css";

const AdminAppointmentsCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/calendarAppointments");
        // Ensure consistent lowercase status for filtering
        const dataWithNormalizedStatus = res.data.map((appt) => ({
          ...appt,
          status: appt.status.toLowerCase(),
        }));
        setAppointments(dataWithNormalizedStatus);
      } catch (err) {
        toast.error("Failed to load calendar appointments");
      }
    };
    fetchAppointments();
  }, []);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
  };

  const getFilteredEvents = () => {
    if (filteredStatus === "all") return appointments;
    return appointments.filter(
      (appt) => appt.status === filteredStatus
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Appointment Calendar</h2>

      <div className="mb-4">
        <label className="font-semibold mr-2">Filter by status:</label>
        <select
          value={filteredStatus}
          onChange={(e) => setFilteredStatus(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        events={getFilteredEvents()}
        eventClick={handleEventClick}
        eventColor="#3788d8"
        height="auto"
      />

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg sm:max-w-md">
            <h3 className="text-xl font-bold mb-2">Appointment Details</h3>
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Start:</strong> {selectedEvent.start.toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedEvent.extendedProps.status}</p>
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointmentsCalendar;