import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import Product from "./models/Product.js";
import KPI from "./models/KPI.js";
import Transaction from "./models/Transaction.js";

import { kpis, products, transactions } from "./data/data.js";

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
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* MOGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

    /* APP DATA ONE TIME ONLY OR AS NEED */
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis)
    //   .catch((err) => console.error(err))
    //   .finally(() => {
    //     console.log("KPI Data added to database");
    //   });
    // Product.insertMany(products)
    //   .catch((err) => console.error(err))
    //   .finally(() => {
    //     console.log("Product Data added to database");
    //   });
    // Transaction.insertMany(transactions)
    //   .catch((err) => console.error(err))
    //   .finally(() => {
    //     console.log("Transaction Data added to database");
    //   });
  })
  .catch((error) => console.log(`${error} did not connect`));
