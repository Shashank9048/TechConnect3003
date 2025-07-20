const express = require("express")
const router = express.Router()
const Technician = require("../models/Technician")

// GET /api/technicians - Get all technicians with optional filters
router.get("/", async (req, res) => {
  try {
    const { specialty, city, minRating, maxRate } = req.query

    // Build filter object
    const filter = {}

    if (specialty) {
      filter.specialties = { $in: [specialty] }
    }

    if (city) {
      filter["location.city"] = new RegExp(city, "i")
    }

    if (minRating) {
      filter.rating = { $gte: Number.parseFloat(minRating) }
    }

    if (maxRate) {
      filter.hourlyRate = { $lte: Number.parseFloat(maxRate) }
    }

    const technicians = await Technician.find(filter).sort({ rating: -1 })
    res.json(technicians)
  } catch (error) {
    console.error("Error fetching technicians:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// GET /api/technicians/:id - Get single technician
router.get("/:id", async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id)
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" })
    }
    res.json(technician)
  } catch (error) {
    console.error("Error fetching technician:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// POST /api/technicians - Create new technician
router.post("/", async (req, res) => {
  try {
    const technician = new Technician(req.body)
    const savedTechnician = await technician.save()
    res.status(201).json(savedTechnician)
  } catch (error) {
    console.error("Error creating technician:", error)
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: "Server error" })
  }
})

// PUT /api/technicians/:id - Update technician
router.put("/:id", async (req, res) => {
  try {
    const technician = await Technician.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!technician) {
      return res.status(404).json({ message: "Technician not found" })
    }

    res.json(technician)
  } catch (error) {
    console.error("Error updating technician:", error)
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: "Server error" })
  }
})

// DELETE /api/technicians/:id - Delete technician
router.delete("/:id", async (req, res) => {
  try {
    const technician = await Technician.findByIdAndDelete(req.params.id)
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" })
    }
    res.json({ message: "Technician deleted successfully" })
  } catch (error) {
    console.error("Error deleting technician:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
