const mongoose = require("mongoose")
const Technician = require("../models/Technician")
require("dotenv").config()

const sampleTechnicians = [
  {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    specialties: ["Plumbing", "HVAC"],
    location: {
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    experience: 8,
    hourlyRate: 75,
    rating: 4.8,
    reviewCount: 127,
    bio: "Experienced plumber and HVAC technician with 8+ years in residential and commercial repairs.",
    availability: [
      { day: "Monday", startTime: "08:00", endTime: "17:00" },
      { day: "Tuesday", startTime: "08:00", endTime: "17:00" },
      { day: "Wednesday", startTime: "08:00", endTime: "17:00" },
      { day: "Thursday", startTime: "08:00", endTime: "17:00" },
      { day: "Friday", startTime: "08:00", endTime: "17:00" },
    ],
    isVerified: true,
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 234-5678",
    specialties: ["Electrical", "Smart Home"],
    location: {
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
    },
    experience: 6,
    hourlyRate: 85,
    rating: 4.9,
    reviewCount: 89,
    bio: "Licensed electrician specializing in smart home installations and electrical repairs.",
    availability: [
      { day: "Monday", startTime: "09:00", endTime: "18:00" },
      { day: "Tuesday", startTime: "09:00", endTime: "18:00" },
      { day: "Wednesday", startTime: "09:00", endTime: "18:00" },
      { day: "Thursday", startTime: "09:00", endTime: "18:00" },
      { day: "Saturday", startTime: "10:00", endTime: "16:00" },
    ],
    isVerified: true,
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Mike Rodriguez",
    email: "mike.rodriguez@email.com",
    phone: "(555) 345-6789",
    specialties: ["Appliance Repair", "Refrigeration"],
    location: {
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
    },
    experience: 12,
    hourlyRate: 65,
    rating: 4.7,
    reviewCount: 203,
    bio: "Appliance repair specialist with over 12 years of experience fixing all major brands.",
    availability: [
      { day: "Monday", startTime: "07:00", endTime: "16:00" },
      { day: "Tuesday", startTime: "07:00", endTime: "16:00" },
      { day: "Wednesday", startTime: "07:00", endTime: "16:00" },
      { day: "Thursday", startTime: "07:00", endTime: "16:00" },
      { day: "Friday", startTime: "07:00", endTime: "16:00" },
      { day: "Saturday", startTime: "08:00", endTime: "14:00" },
    ],
    isVerified: true,
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "(555) 456-7890",
    specialties: ["Carpentry", "Home Renovation"],
    location: {
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
    },
    experience: 10,
    hourlyRate: 90,
    rating: 4.9,
    reviewCount: 156,
    bio: "Master carpenter specializing in custom woodwork and home renovations.",
    availability: [
      { day: "Monday", startTime: "08:00", endTime: "17:00" },
      { day: "Tuesday", startTime: "08:00", endTime: "17:00" },
      { day: "Wednesday", startTime: "08:00", endTime: "17:00" },
      { day: "Thursday", startTime: "08:00", endTime: "17:00" },
      { day: "Friday", startTime: "08:00", endTime: "17:00" },
    ],
    isVerified: true,
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "(555) 567-8901",
    specialties: ["Painting", "Drywall"],
    location: {
      city: "Austin",
      state: "TX",
      zipCode: "73301",
    },
    experience: 7,
    hourlyRate: 55,
    rating: 4.6,
    reviewCount: 98,
    bio: "Professional painter and drywall specialist with attention to detail and quality finishes.",
    availability: [
      { day: "Monday", startTime: "07:00", endTime: "16:00" },
      { day: "Tuesday", startTime: "07:00", endTime: "16:00" },
      { day: "Wednesday", startTime: "07:00", endTime: "16:00" },
      { day: "Thursday", startTime: "07:00", endTime: "16:00" },
      { day: "Friday", startTime: "07:00", endTime: "16:00" },
      { day: "Saturday", startTime: "08:00", endTime: "15:00" },
    ],
    isVerified: true,
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
]

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/techconnect"
    await mongoose.connect(mongoURI)
    console.log("✅ Connected to MongoDB")

    await Technician.deleteMany({})
    console.log("🗑️ Cleared existing technicians")

    const insertedTechnicians = await Technician.insertMany(sampleTechnicians)
    console.log(`✅ Inserted ${insertedTechnicians.length} sample technicians`)

    console.log("🎉 Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
