import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Cookies
app.use(cookieParser());

// CORS for local dev only; in production, frontend served from same origin
if (process.env.NODE_ENV !== "production") {
  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
  app.use(
    cors({
      origin: FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
}

// API routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  console.log("Serving frontend from:", frontendPath);

  app.use(express.static(frontendPath));

  // Catch-all route
  app.get("*", (req, res) => {
    const indexFile = path.join(frontendPath, "index.html");
    res.sendFile(indexFile, (err) => {
      if (err) {
        console.error("Error sending index.html:", err);
        res.status(500).send("Server error");
      }
    });
  });
}

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDb();
});
