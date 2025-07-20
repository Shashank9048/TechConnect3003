const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://techconnect-frontend.vercel.app",
      "https://techconnect-mern.vercel.app",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  }),
)
app.use(express.json())

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/techconnect"
    await mongoose.connect(mongoURI)
    console.log("✅ MongoDB Connected Successfully")
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message)
    process.exit(1)
  }
}

// Connect to Database
connectDB()

// Import Routes
const technicianRoutes = require("./routes/technicians")
const userRoutes = require("./routes/users")
const bookingRoutes = require("./routes/bookings")

// Use Routes
app.use("/api/technicians", technicianRoutes)
app.use("/api/users", userRoutes)
app.use("/api/bookings", bookingRoutes)

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "TechConnect API is running!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  })
})

// API status route
app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`)
})
