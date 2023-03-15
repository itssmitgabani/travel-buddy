import { createFeedback, getFeedback, getFeedbacks } from "../controllers/feedback.js";
import express from "express";


const router = express.Router();

router.post("/create",createFeedback)
router.get("/find/:id",getFeedback)
router.get("/",getFeedbacks)

export default router;