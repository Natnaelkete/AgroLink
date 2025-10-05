import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import smsRoutes from "./routes/sms.route";
import productRoutes from "./routes/product.route";
import adviceRoutes from "./routes/diseaseDetection.route";
import weatherPredictionRoutes from "./routes/weatherPrediction.Route";
import cartRoutes from './routes/cart.routes';
import paymentRoute from './routes/paymentRoute';
import diseaseDetectionRoute from "./routes/diseaseDetection.route";
import profileRoute from "./routes/profileRoute"
import soilRoutes from "./routes/soilRoutes";




const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

app.use('/api/payment', paymentRoute);
app.use("/api/auth", authRoutes);
app.use("/api/sms", smsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/advice", adviceRoutes);
app.use("/api/weather-prediction", weatherPredictionRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/diseaseDetection", diseaseDetectionRoute);
app.use("/api/profile", profileRoute)
app.use("/api/soil", soilRoutes);
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
