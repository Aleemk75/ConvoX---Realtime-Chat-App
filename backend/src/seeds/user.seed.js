import { config } from "dotenv";
import { connectDb } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "priya.sharma@example.com",
    fullname: "Priya Sharma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    email: "ananya.verma@example.com",
    fullname: "Ananya Verma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    email: "isha.patel@example.com",
    fullname: "Isha Patel",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    email: "kavya.nair@example.com",
    fullname: "Kavya Nair",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    email: "meera.reddy@example.com",
    fullname: "Meera Reddy",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    email: "sanya.kapoor@example.com",
    fullname: "Sanya Kapoor",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    email: "riya.mehra@example.com",
    fullname: "Riya Mehra",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/27.jpg",
  },
  {
    email: "aisha.singh@example.com",
    fullname: "Aisha Singh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/28.jpg",
  },

  // Male Users
  {
    email: "arjun.kumar@example.com",
    fullname: "Arjun Kumar",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    email: "rahul.verma@example.com",
    fullname: "Rahul Verma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    email: "vihan.reddy@example.com",
    fullname: "Vihan Reddy",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    email: "advait.patel@example.com",
    fullname: "Advait Patel",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    email: "rohan.nair@example.com",
    fullname: "Rohan Nair",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    email: "kabir.shah@example.com",
    fullname: "Kabir Shah",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/26.jpg",
  },
  {
    email: "ayush.malhotra@example.com",
    fullname: "Ayush Malhotra",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/27.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDb();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
