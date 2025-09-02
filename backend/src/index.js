import express from "express";
import dotenv from "dotenv"
import { connectDb } from "./lib/db.js";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.js"
import messageRouter from "./routes/message.route.js"
import path from "path";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); // allow bigger JSON payloads
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({
    origin:FRONTEND_URL,
     methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}))

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
    connectDb();
})