import express from "express";
import { addFlight, findFlight, findFlightByDate, findFlightForSingle, findSingleFlight, getTotalFlight, updateFlight } from "../controllers/flight.js";


const router = express.Router();


router.post("/add",addFlight)
router.get("/find/:id",findFlight)
router.get("/:id",findFlightForSingle)
router.get("/totalFlight/:id",getTotalFlight)
router.put("/update/:id",updateFlight)
router.get("/",findFlightByDate)

router.get("/f/:id",findSingleFlight)

export default router;