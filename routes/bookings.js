const express = require("express")
const router = express.Router()
const Booking = require("../models/Booking")

// GET /api/bookings - Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phone")
      .populate("technician", "name email phone specialties")
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// POST /api/bookings - Create new booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body)
    const savedBooking = await booking.save()

    // Populate the saved booking with user and technician details
    const populatedBooking = await Booking.findById(savedBooking._id)
      .populate("user", "name email phone")
      .populate("technician", "name email phone specialties")

    res.status(201).json(populatedBooking)
  } catch (error) {
    console.error("Error creating booking:", error)
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: "Server error" })
  }
})

// GET /api/bookings/:id - Get single booking
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("technician", "name email phone specialties")

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    res.json(booking)
  } catch (error) {
    console.error("Error fetching booking:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// PUT /api/bookings/:id - Update booking status
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate("user", "name email phone")
      .populate("technician", "name email phone specialties")

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    res.json(booking)
  } catch (error) {
    console.error("Error updating booking:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
