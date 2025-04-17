import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBriefcase, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import '../../assets/css/appointmentId.css';

const AppointmentBookingById = () => {
  const { lawyerId } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch lawyer data and availability
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lawyerResponse, slotsResponse] = await Promise.all([
          axios.get(`/lawyer/${lawyerId}`),
          axios.get(`/lawyer/${lawyerId}/availability`)
        ]);
        
        setLawyer(lawyerResponse.data);
        setAvailableSlots(slotsResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load lawyer data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lawyerId]);

  // Filter available times for selected date
  const timesForSelectedDate = selectedDate 
    ? availableSlots.filter(slot => slot.date === selectedDate)
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/appointment', {
        lawyerId,
        date: selectedDate,
        time: selectedTime,
        notes
      });
      
      // Redirect to confirmation page or show success message
      window.location.href = `/appointment-confirmed/${response.data._id}`;
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading lawyer information...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!lawyer) return <div className="error">Lawyer not found</div>;

  return (
    <div className="appointment-page">
      <div className="lawyer-header">
        <img 
          src={lawyer.profileImage || '/default-avatar.jpg'} 
          alt={lawyer.name} 
          className="lawyer-avatar" 
        />
        <div className="lawyer-info">
          <h1>Book Consultation with {lawyer.name}</h1>
          <span className="lawyer-specialty">{lawyer.specialization}</span>
          <div className="lawyer-meta">
            <span><FaBriefcase /> {lawyer.experience} years experience</span>
            <span className="rating"><FaStar /> {lawyer.rating} ({lawyer.reviewCount} reviews)</span>
            <span><FaMapMarkerAlt /> {lawyer.location}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-container">
        <div className="booking-form">
          <h2>Schedule Your Appointment</h2>
          
          <div className="form-group">
            <label htmlFor="appointment-date">
              <FaCalendarAlt /> Select Date
            </label>
            <input
              type="date"
              id="appointment-date"
              className="form-control"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime('');
              }}
              required
            />
          </div>

          {selectedDate && (
            <div className="form-group">
              <label htmlFor="appointment-time">
                <FaClock /> Available Time Slots
              </label>
              <div className="time-slots">
                {timesForSelectedDate.length > 0 ? (
                  timesForSelectedDate.map((slot) => (
                    <div
                      key={slot.time}
                      className={`time-slot ${selectedTime === slot.time ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      {slot.time}
                    </div>
                  ))
                ) : (
                  <p>No available slots for this date</p>
                )}
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              className="form-control"
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requirements or details..."
            />
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={!selectedDate || !selectedTime || isSubmitting}
          >
            {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
          </button>

          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="booking-summary">
          <h2>Appointment Summary</h2>
          
          <div className="summary-item">
            <span className="summary-label">Lawyer:</span>
            <span className="summary-value">{lawyer.name}</span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Specialization:</span>
            <span className="summary-value">{lawyer.specialization}</span>
          </div>

          {selectedDate && (
            <div className="summary-item">
              <span className="summary-label">Date:</span>
              <span className="summary-value">
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}

          {selectedTime && (
            <div className="summary-item">
              <span className="summary-label">Time:</span>
              <span className="summary-value">{selectedTime}</span>
            </div>
          )}

          <div className="summary-item">
            <span className="summary-label">Consultation Fee:</span>
            <span className="summary-value">${lawyer.consultationFee || '150'}</span>
          </div>

          <div className="summary-item total">
            <span className="summary-label">Total:</span>
            <span className="summary-value">${lawyer.consultationFee || '150'}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentBookingById;