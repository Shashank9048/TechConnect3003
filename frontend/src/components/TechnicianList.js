"use client"
import TechnicianCard from "./TechnicianCard"
import "./TechnicianList.css"

const TechnicianList = ({ technicians, loading, onTechnicianSelect, onBookNow }) => {
  if (loading) {
    return (
      <section className="technician-list">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading technicians...</p>
          </div>
        </div>
      </section>
    )
  }

  if (technicians.length === 0) {
    return (
      <section className="technician-list">
        <div className="container">
          <div className="no-results">
            <h3>No technicians found</h3>
            <p>Try adjusting your search filters or check back later.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="technician-list">
      <div className="container">
        <div className="list-header">
          <h2>Available Technicians</h2>
          <p>
            Found {technicians.length} technician{technicians.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="technician-grid">
          {technicians.map((technician) => (
            <TechnicianCard
              key={technician._id}
              technician={technician}
              onSelect={() => onTechnicianSelect(technician)}
              onBookNow={() => onBookNow(technician)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnicianList
