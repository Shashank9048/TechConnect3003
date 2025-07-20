"use client"

import { useState } from "react"
import "./BookingForm.css"

const BookingForm = ({ technician, user, apiBaseUrl, onBack, onBookingComplete }) => {
  const [formData, setFormData] = useState({
    serviceType: "",
    description: "",
    scheduledDate: "",
    scheduledTime: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    notes: "",
  })
  const [estimatedCost, setEstimatedCost] = useState(0)
  const [estimatedHours, setEstimatedHours] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleHoursChange = (e) => {
    const hours = Number.parseFloat(e.target.value) || 1
    setEstimatedHours(hours)
    setEstimatedCost(hours * technician.hourlyRate)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const bookingData = {
        user: user._id,
        technician: technician._id,
        serviceType: formData.serviceType,
        description: formData.description,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime,
        totalCost: estimatedCost,
        address: formData.address,
        notes: formData.notes,
      }

      const response = await fetch(`${apiBaseUrl}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        throw new Error("Failed to create booking")
      }

      const result = await response.json()
      console.log("Booking created:", result)
      onBookingComplete()
    } catch (error) {
      console.error("Error creating booking:", error)
      alert("Failed to create booking. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Get today's date for min date validation
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="booking-form-container">
      <div className="container">
        <button className="btn btn-secondary back-btn" onClick={onBack}>
          ← Back to Profile
        </button>

        <div className="booking-content">
          <div className="booking-header">
            <h2>Book Service with {technician.name}</h2>
            <div className="technician-summary">
              <img
                src={technician.profileImage || "/placeholder.svg"}
                alt={technician.name}
                className="technician-thumb"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                }}
              />
              <div>
                <h4>{technician.name}</h4>
                <p>{technician.specialties.join(", ")}</p>
                <p className="rate">${technician.hourlyRate}/hour</p>
              </div>
            </div>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-section">
                <h3>Service Details</h3>

                <div className="form-group">
                  <label className="form-label">Service Type *</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select a service</option>
                    {technician.specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Describe the issue or service needed..."
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Preferred Date *</label>
                    <input
                      type="date"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleInputChange}
                      className="form-input"
                      min={today}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Time *</label>
                    <select
                      name="scheduledTime"
                      value={formData.scheduledTime}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select time</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Estimated Hours</label>
                  <input
                    type="number"
                    min="0.5"
                    max="8"
                    step="0.5"
                    value={estimatedHours}
                    onChange={handleHoursChange}
                    className="form-input"
                  />
                  <small className="form-help">This helps estimate the total cost</small>
                </div>
              </div>

              <div className="form-section">
                <h3>Service Address</h3>

                <div className="form-group">
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="NY"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">ZIP Code *</label>
                    <input
                      type="text"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="12345"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Any special instructions or additional information..."
                    rows="3"
                  />
                </div>
              </div>
            </div>

            <div className="cost-summary">
              <h3>Cost Estimate</h3>
              <div className="cost-breakdown">
                <div className="cost-item">
                  <span>Hourly Rate:</span>
                  <span>${technician.hourlyRate}/hour</span>
                </div>
                <div className="cost-item">
                  <span>Estimated Hours:</span>
                  <span>{estimatedHours} hours</span>
                </div>
                <div className="cost-item total">
                  <span>Estimated Total:</span>
                  <span>${estimatedCost.toFixed(2)}</span>
                </div>
              </div>
              <small className="cost-note">* Final cost may vary based on actual time and materials needed</small>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit Booking Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingForm
