"use client"

import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import SearchSection from "./components/SearchSection"
import TechnicianList from "./components/TechnicianList"
import TechnicianProfile from "./components/TechnicianProfile"
import BookingForm from "./components/BookingForm"
import UserRegistration from "./components/UserRegistration"

function App() {
  const [currentView, setCurrentView] = useState("home")
  const [selectedTechnician, setSelectedTechnician] = useState(null)
  const [technicians, setTechnicians] = useState([])
  const [filteredTechnicians, setFilteredTechnicians] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  // Fetch technicians from backend
  const fetchTechnicians = async (filters = {}) => {
    setLoading(true)
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams()
      if (filters.specialty) queryParams.append("specialty", filters.specialty)
      if (filters.city) queryParams.append("city", filters.city)
      if (filters.minRating) queryParams.append("minRating", filters.minRating)
      if (filters.maxRate) queryParams.append("maxRate", filters.maxRate)

      const response = await fetch(`http://localhost:5000/api/technicians?${queryParams}`)
      if (!response.ok) {
        throw new Error("Failed to fetch technicians")
      }

      const data = await response.json()
      setTechnicians(data)
      setFilteredTechnicians(data)
    } catch (error) {
      console.error("Error fetching technicians:", error)
      alert("Failed to load technicians. Make sure the backend server is running on http://localhost:5000")
    } finally {
      setLoading(false)
    }
  }

  // Load technicians on component mount
  useEffect(() => {
    fetchTechnicians()
  }, [])

  const handleSearch = (filters) => {
    fetchTechnicians(filters)
  }

  const handleTechnicianSelect = (technician) => {
    setSelectedTechnician(technician)
    setCurrentView("profile")
  }

  const handleBookNow = (technician) => {
    if (!user) {
      alert("Please register/login first to book a technician")
      setCurrentView("register")
      return
    }
    setSelectedTechnician(technician)
    setCurrentView("booking")
  }

  const handleNavigation = (view) => {
    setCurrentView(view)
    if (view === "home") {
      setSelectedTechnician(null)
    }
  }

  const handleUserRegistered = (userData) => {
    setUser(userData)
    setCurrentView("home")
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "profile":
        return (
          <TechnicianProfile
            technician={selectedTechnician}
            onBookNow={handleBookNow}
            onBack={() => setCurrentView("home")}
          />
        )
      case "booking":
        return (
          <BookingForm
            technician={selectedTechnician}
            user={user}
            onBack={() => setCurrentView("profile")}
            onBookingComplete={() => {
              alert("Booking submitted successfully!")
              setCurrentView("home")
            }}
          />
        )
      case "register":
        return <UserRegistration onUserRegistered={handleUserRegistered} onBack={() => setCurrentView("home")} />
      default:
        return (
          <>
            <SearchSection onSearch={handleSearch} />
            <TechnicianList
              technicians={filteredTechnicians}
              loading={loading}
              onTechnicianSelect={handleTechnicianSelect}
              onBookNow={handleBookNow}
            />
          </>
        )
    }
  }

  return (
    <div className="App">
      <Header currentView={currentView} onNavigation={handleNavigation} user={user} onLogout={() => setUser(null)} />
      <main className="main-content">{renderCurrentView()}</main>
    </div>
  )
}

export default App
