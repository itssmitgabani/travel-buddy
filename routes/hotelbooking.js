import { bookHotel, getChartData, getHotelBooking, getHotelBookingCount, getHotelBookingCountForSingle, getHotelBookings, getRevenue, getRevenueForSingle, getTotal, VerifyBooking } from "../controllers/hotelbooking.js";
import express from "express";


const router = express.Router();

router.post("/book",bookHotel)

router.get("/find/:id", getHotelBooking);
//GET ALL

router.get("/", getHotelBookings);

router.get("/count", getHotelBookingCount);
router.get("/count/:id", getHotelBookingCountForSingle);


router.get("/total", getTotal);

router.get("/totalRevenue", getRevenue);
router.get("/totalRevenue/:id", getRevenueForSingle);

router.get("/chart/:id", getChartData);

router.put("/verify/:id",VerifyBooking);

export default router;