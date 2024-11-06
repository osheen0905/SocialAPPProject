const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./auth");
const postRoutes = require("./post");
const followRoutes = require("./follow");

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser()); // Middleware to parse cookies

// Middleware to handle authentication errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Invalid token" });
  }
  next();
});

// Routes
app.use("/auth", authRoutes); // Authentication routes (login, signup, etc.)
app.use("/post", postRoutes); // Post-related routes (create, delete, like, etc.)
app.use("/user", followRoutes); // Follow-related routes

const PORT = process.env.PORT || 3000; // Use environment variable for port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
