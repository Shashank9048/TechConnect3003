"use client"
import "./TechnicianCard.css"

const TechnicianCard = ({ technician, onSelect, onBookNow }) => {
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

  return (
    <div className="technician-card card">
      <div className="card-header">
        <div className="technician-avatar">
          <img
            src={technician.profileImage || "/placeholder.svg"}
            alt={technician.name}
            onError={(e) => {
              e.target.src = "/placeholder.svg?height=80&width=80"
            }}
          />
          {technician.isVerified && <div className="verified-badge">✓</div>}
        </div>
        <div className="technician-info">
          <h3>{technician.name}</h3>
          <p className="location">
            {technician.location.city}, {technician.location.state}
          </p>
          <div className="rating">
            <div className="stars">{renderStars(technician.rating)}</div>
            <span className="rating-text">
              {technician.rating.toFixed(1)} ({technician.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="specialties">
          <h4>Specialties:</h4>
          <div className="specialty-tags">
            {technician.specialties.map((specialty, index) => (
              <span key={index} className="specialty-tag">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="details">
          <div className="detail-item">
            <span className="label">Experience:</span>
            <span className="value">{technician.experience} years</span>
          </div>
          <div className="detail-item">
            <span className="label">Rate:</span>
            <span className="value">${technician.hourlyRate}/hour</span>
          </div>
        </div>

        {technician.bio && <p className="bio">{technician.bio}</p>}
      </div>

      <div className="card-footer">
        <button className="btn btn-outline" onClick={onSelect}>
          View Profile
        </button>
        <button className="btn btn-primary" onClick={onBookNow}>
          Book Now
        </button>
      </div>
    </div>
  )
}

export default TechnicianCard
