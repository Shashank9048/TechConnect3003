"use client"

import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import SearchSection from "./components/SearchSection"
import TechnicianList from "./components/TechnicianList"
import TechnicianProfile from "./components/TechnicianProfile"
import BookingForm from "./components/BookingForm"
import UserRegistration from "./components/UserRegistration"

// API Base URL - automatically detects environment
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production" ? "https://techconnect-backend.railway.app" : "http://localhost:5000")

function App() {
  const [currentView, setCurrentView] = useState("home")
  const [selectedTechnician, setSelectedTechnician] = useState(null)
  const [technicians, setTechnicians] = useState([])
  const [filteredTechnicians, setFilteredTechnicians] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  // Check for existing user session on app load
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      // Verify token and get user data
      fetchUserProfile(token)
    }
  }, [])

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        localStorage.removeItem("token")
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
      localStorage.removeItem("token")
    }
  }

  // Fetch technicians from backend
  const fetchTechnicians = async (filters = {}) => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
      if (filters.specialty) queryParams.append("specialty", filters.specialty)
      if (filters.city) queryParams.append("city", filters.city)
      if (filters.minRating) queryParams.append("minRating", filters.minRating)
      if (filters.maxRate) queryParams.append("maxRate", filters.maxRate)

      const response = await fetch(`${API_BASE_URL}/api/technicians?${queryParams}`)
      if (!response.ok) {
        throw new Error("Failed to fetch technicians")
      }

      const data = await response.json()
      setTechnicians(data)
      setFilteredTechnicians(data)
    } catch (error) {
      console.error("Error fetching technicians:", error)
      alert("Failed to load technicians. Please check your internet connection and try again.")
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

  const handleUserRegistered = (userData, token) => {
    setUser(userData)
    localStorage.setItem("token", token)
    setCurrentView("home")
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("token")
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
            apiBaseUrl={API_BASE_URL}
            onBack={() => setCurrentView("profile")}
            onBookingComplete={() => {
              alert("Booking submitted successfully!")
              setCurrentView("home")
            }}
          />
        )
      case "register":
        return (
          <UserRegistration
            apiBaseUrl={API_BASE_URL}
            onUserRegistered={handleUserRegistered}
            onBack={() => setCurrentView("home")}
          />
        )
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
      <Header currentView={currentView} onNavigation={handleNavigation} user={user} onLogout={handleLogout} />
      <main className="main-content">{renderCurrentView()}</main>
      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2025 TechConnect. Find and book local technicians with ease.</p>
          <p>
            <small>
              API Status: <span className="status-indicator">🟢 Online</span> | Environment:{" "}
              {process.env.NODE_ENV || "development"}
            </small>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
