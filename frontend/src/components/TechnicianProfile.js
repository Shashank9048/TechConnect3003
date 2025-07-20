"use client"
import "./TechnicianProfile.css"

const TechnicianProfile = ({ technician, onBookNow, onBack }) => {
  if (!technician) {
    return <div>Loading...</div>
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>,
      )
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ★
        </span>,
      )
    }

    return stars
  }

  const formatAvailability = (availability) => {
    const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    return availability
      .sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day))
      .map((slot) => ({
        ...slot,
        formattedTime: `${slot.startTime} - ${slot.endTime}`,
      }))
  }

  return (
    <div className="technician-profile">
      <div className="container">
        <button className="btn btn-secondary back-btn" onClick={onBack}>
          ← Back to Search
        </button>

        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar">
              <img
                src={technician.profileImage || "/placeholder.svg"}
                alt={technician.name}
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=150&width=150"
                }}
              />
              {technician.isVerified && <div className="verified-badge">✓ Verified</div>}
            </div>

            <div className="profile-info">
              <h1>{technician.name}</h1>
              <p className="location">
                📍 {technician.location.city}, {technician.location.state} {technician.location.zipCode}
              </p>
              <p className="contact">
                📞 {technician.phone} | ✉️ {technician.email}
              </p>

              <div className="rating-section">
                <div className="stars">{renderStars(technician.rating)}</div>
                <span className="rating-text">
                  {technician.rating.toFixed(1)} out of 5 ({technician.reviewCount} reviews)
                </span>
              </div>

              <div className="key-stats">
                <div className="stat">
                  <span className="stat-value">{technician.experience}</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-value">${technician.hourlyRate}</span>
                  <span className="stat-label">Per Hour</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-details">
            <div className="details-grid">
              <div className="detail-section">
                <h3>Specialties</h3>
                <div className="specialty-list">
                  {technician.specialties.map((specialty, index) => (
                    <span key={index} className="specialty-badge">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h3>About</h3>
                <p className="bio">{technician.bio || "No bio available for this technician."}</p>
              </div>

              <div className="detail-section">
                <h3>Availability</h3>
                <div className="availability-grid">
                  {formatAvailability(technician.availability).map((slot, index) => (
                    <div key={index} className="availability-slot">
                      <span className="day">{slot.day}</span>
                      <span className="time">{slot.formattedTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-primary book-btn" onClick={() => onBookNow(technician)}>
              Book This Technician
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechnicianProfile
