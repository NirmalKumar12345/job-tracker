import express, { application } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRouter.js'
import jobRoutes from './routes/jobRouter.js'
import applicationRoutes from './routes/applicationRouter.js'
import profileRoutes from './routes/profileRoutes.js'

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json());

app.use('/api/auth',authRoutes);

app.use('/api/job',jobRoutes);

app.use('/api/application',applicationRoutes);

app.use('/api/profile',profileRoutes);

app.use("/uploads",express.static("uploads"));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((err,req,res,next)=>{
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({msg: err.message || "Server Error"})
})

export default app;