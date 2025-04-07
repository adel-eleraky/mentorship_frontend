import React, { useState } from "react";

const SettingsSection = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
  
  // Initialize state for each day with empty availability
  const [availability, setAvailability] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        isAvailable: false,
        slots: timeSlots.reduce((slotAcc, time) => {
          slotAcc[time] = false;
          return slotAcc;
        }, {})
      };
      return acc;
    }, {})
  );

  // For profile image
  const [profileImage, setProfileImage] = useState('/img/default-avatar.png');

  // Handle day availability toggle
  const handleDayToggle = (day) => {
    setAvailability(prev => {
      const updatedDay = {
        ...prev[day],
        isAvailable: !prev[day].isAvailable
      };
      
      // If day becomes unavailable, clear all time slots
      if (!updatedDay.isAvailable) {
        Object.keys(updatedDay.slots).forEach(slot => {
          updatedDay.slots[slot] = false;
        });
      }
      
      return {
        ...prev,
        [day]: updatedDay
      };
    });
  };

  // Handle time slot toggle
  const handleSlotToggle = (day, slot) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: {
          ...prev[day].slots,
          [slot]: !prev[day].slots[slot]
        }
      }
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format data as an object with days and times array
    const formattedAvailability = {};
    
    Object.keys(availability).forEach(day => {
      if (availability[day].isAvailable) {
        const availableTimes = [];
        
        Object.keys(availability[day].slots).forEach(slot => {
          if (availability[day].slots[slot]) {
            availableTimes.push(slot);
          }
        });
        
        // Only add days that have at least one time slot selected
        if (availableTimes.length > 0) {
          formattedAvailability[day] = availableTimes;
        }
      }
    });
    
    // Here you would typically send the data to your API
    console.log("Submitting availability:", formattedAvailability);
    
    // For demo, show the formatted data in console and alert
    console.log(JSON.stringify(formattedAvailability, null, 2));
    alert("Your availability has been saved successfully!");
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-gradient" style={{ background: 'linear-gradient(135deg, #118577 0%, #0ea2a2 100%)' }}>
        <div className="d-flex align-items-center py-2">
          <img 
            src={profileImage} 
            alt="Mentor Profile" 
            className="rounded-circle border border-3 border-white shadow-sm"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
          <div className="ms-3 text-white">
            <h4 className="mb-0">Set Your Mentoring Schedule</h4>
            <p className="mb-0 opacity-75">Let students know when you're available</p>
          </div>
        </div>
      </div>
      
      <div className="card-body p-4">
        <div className="alert alert-info d-flex" role="alert">
          <i className="fas fa-info-circle me-2 mt-1"></i>
          <div>
            Select your availability for next week. Students will only be able to book appointments during these times.
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {daysOfWeek.map(day => (
              <div key={day} className="col-12">
                <div className={`card h-100 ${availability[day].isAvailable ? 'border-primary' : 'border-light'}`}>
                  <div className="card-body">
                    <div className="form-check form-switch d-flex justify-content-between align-items-center mb-3">
                      <label className="form-check-label fw-bold fs-5" htmlFor={`available-${day}`}>
                        <i className={`far ${availability[day].isAvailable ? 'fa-calendar-check text-primary' : 'fa-calendar'} me-2`}></i>
                        {day}
                      </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`available-${day}`}
                        checked={availability[day].isAvailable}
                        onChange={() => handleDayToggle(day)}
                        style={{ width: "3rem", height: "1.5rem" }}
                      />
                    </div>
                    
                    {availability[day].isAvailable ? (
                      <div className="row g-2 mt-3">
                        {timeSlots.map(slot => (
                          <div key={`${day}-${slot}`} className="col-md-4">
                            <div 
                              className={`
                                time-slot p-2 rounded text-center 
                                ${availability[day].slots[slot] ? 'bg-primary text-white' : 'bg-light'} 
                                cursor-pointer transition-all hover-shadow
                              `}
                              style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                              onClick={() => handleSlotToggle(day, slot)}
                            >
                              <i className={`far ${availability[day].slots[slot] ? 'fa-clock' : 'fa-clock'} me-2`}></i>
                              {slot}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted py-4">
                        <i className="far fa-calendar-times fs-1 mb-3 opacity-50"></i>
                        <p>You're not available on this day</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
            <button type="button" className="btn btn-outline-secondary px-4">
              <i className="fas fa-times me-2"></i>
              Cancel
            </button>
            <button type="submit" className="btn text-white px-4" style={{ backgroundColor: "#118577" }}>
              <i className="fas fa-save me-2"></i>
              Save Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsSection;