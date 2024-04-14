import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan  from "morgan";
import kpiRoutes from "./routes/kpi.js";
import KPI from  "./models/KPI.js";
import { kpis } from "./data/data.js";


/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


/* ROUTE SETUP */
app.use("/kpi", kpiRoutes);


/* MOGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL)
.then(async () => {
    app.listen(PORT,  () => console.log(`Server running on port: ${PORT}`))

    /* APP DATA ONE TIME ONLY OR AS NEED */
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis).catch((err) => console.error(err)).finally(() => {
    //     console.log('Data added to database');
    //     });
    })
.catch((error) => console.log(`${error} did not connect`));
