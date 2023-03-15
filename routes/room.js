import express from "express";
import { addRoom, findRoom, findRoomByCity, findSingleRoom, findWishlistRoom, getTotalRoom, updateRoom } from "../controllers/room.js";


const router = express.Router();


router.post("/add",addRoom)
router.get("/find/:id",findRoom)
router.get("/f/:id",findSingleRoom)
router.get("/",findRoomByCity)
router.get("/wishlistRoom/:rid",findWishlistRoom)
router.get("/totalRoom/:id",getTotalRoom)
router.put("/update/:id",updateRoom)

export default router;