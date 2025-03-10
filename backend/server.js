require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("./config/passport");

const cors = require('cors');
const compression = require('compression');

const authRouter = require('./routes/AuthRoutes');
const AppError = require('./utils/appError');
const transferRoutes = require("./routes/TransferRoutes");

const express = require('express');
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

app.use(compression());

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  methods: 'GET,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, 
};

app.use(cors(corsOptions));

// Middleware to handle sessions and Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth/', authRouter);
app.use("/api/v1/transfers", transferRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Currency Converter API is running...");
});

// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
