import express from "express";
import petRouter from "../models/pet/routes";
import adopterRouter from "../models/adopter/routes";

const router = (app: express.Router) => {
    app.use("/pets", petRouter);
    app.use("/adopters", adopterRouter);
}

export default router;