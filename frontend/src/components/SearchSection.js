"use client"

import { useState } from "react"
import "./SearchSection.css"

const SearchSection = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    specialty: "",
    city: "",
    minRating: "",
    maxRate: "",
  })

  const specialties = [
    "Plumbing",
    "Electrical",
    "HVAC",
    "Appliance Repair",
    "Smart Home",
    "Refrigeration",
    "Carpentry",
    "Painting",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Remove empty filters
    const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== ""))
    onSearch(cleanFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      specialty: "",
      city: "",
      minRating: "",
      maxRate: "",
    })
    onSearch({})
  }

  return (
    <section className="search-section">
      <div className="container">
        <div className="search-header">
          <h2>Find the Perfect Technician</h2>
          <p>Search and filter through our verified local technicians</p>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-grid">
            <div className="form-group">
              <label className="form-label">Service Type</label>
              <select name="specialty" value={filters.specialty} onChange={handleInputChange} className="form-select">
                <option value="">All Services</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleInputChange}
                placeholder="Enter city name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Minimum Rating</label>
              <select name="minRating" value={filters.minRating} onChange={handleInputChange} className="form-select">
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Max Hourly Rate</label>
              <select name="maxRate" value={filters.maxRate} onChange={handleInputChange} className="form-select">
                <option value="">Any Rate</option>
                <option value="50">Under $50/hr</option>
                <option value="75">Under $75/hr</option>
                <option value="100">Under $100/hr</option>
                <option value="150">Under $150/hr</option>
              </select>
            </div>
          </div>

          <div className="search-actions">
            <button type="submit" className="btn btn-primary">
              Search Technicians
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default SearchSection
