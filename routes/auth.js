import express from "express";
import { hotellogin, hotelregister , adminlogin , adminregister, airlinelogin, airlineregister, userLogin, userregister, hotelVerify, airlineVerify, userVerify } from "../controllers/auth.js";

const router = express.Router();

router.post("/admin/login", adminlogin)
router.post("/admin/register", adminregister)

router.post("/hotel/login", hotellogin)
router.post("/hotel/register", hotelregister)
router.get("/hotel/verify/:id/:token", hotelVerify)

router.post("/airline/login", airlinelogin)
router.post("/airline/register", airlineregister)
router.get("/airline/verify/:id/:token", airlineVerify)

router.post("/user/login", userLogin)
router.get("/user/verify/:id/:token", userVerify)
router.post("/user/register", userregister)

export default router