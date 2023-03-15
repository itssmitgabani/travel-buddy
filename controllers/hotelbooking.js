import mongoose from "mongoose";
import HotelBooking from "../models/hotelbooking.js";

export const bookHotel = async (req,res,next)=>{
    const hotelBook = new HotelBooking(req.body);
    try{
        const savedBookHotel = await hotelBook.save();
        res.status(200).json("hotel booked successfully");
    }catch(err){
        next(err)
    }
}

export const getHotelBooking = async (req, res, next) => {
    try {
      const hotelbooking = await HotelBooking.findById(req.params.id);
      res.status(200).json(hotelbooking);
    } catch (err) {
      next(err);
    }
  };
  export const getHotelBookings = async (req, res, next) => {
    try {
      const hotelbookings = await HotelBooking.aggregate([
        {
          $lookup:
            {
              from: "users",
              localField: "u_id",
              foreignField: "_id",
              as: "user",
            },
        },
        {
          $unwind:
            {
              path: "$user",
            },
        },
        {
          $lookup:
            {
              from: "hotels",
              localField: "h_id",
              foreignField: "_id",
              as: "hotel",
            },
        },
        {
          $unwind:
            {
              path: "$hotel",
            },
        },
        {
        
            $project:
              {
                _id: 1,
                username: "$user.username",
                img: "$user.img",
                rooms: 1,
                children: 1,
                adult: 1,
                totalAmt: 1,
                discountAmt: 1,
                bookingdate: 1,
                hotelname: "$hotel.hotelname"
            
          },
        },
      ]);
      res.status(200).json(hotelbookings);
    } catch (err) {
      next(err);
    }
  };

  export const getHotelBookingCount = async (req, res, next) => {
    try {
      const hotelbookings = await HotelBooking.countDocuments();
      res.status(200).json(hotelbookings);
    } catch (err) {
      next(err);
    }
  };
  export const getHotelBookingCountForSingle = async (req, res, next) => {
    try {
      const hotelbookings = await HotelBooking.countDocuments({h_id: new mongoose.Types.ObjectId(req.params.id)});
      res.status(200).json(hotelbookings);
    } catch (err) {
      next(err);
    }
  };
  
  export const getTotal = async (req, res, next) => {
    try {

      const hotelbookings = await HotelBooking.aggregate([{
        $group:
        {
        _id: {month:{$month:"$createdAt"}},
        total: {
          $sum: "$totalAmt"
        }
      }
    },{
      $sort:{
        "_id.month":1
      }
    }
  ]);
      res.status(200).json(hotelbookings);
    } catch (err) {
      next(err);
    }
  };

  export const getRevenue = async (req, res, next) => {
    try {

      const hotelbookings = await HotelBooking.aggregate([
        {
        $project:{
          totalAmt:1,
          discountAmt:1,
          _id:0,
          id:"hii"
        }
        },
        
        {
        $group:
        {
          _id: "$id",
          total: {
            $sum: "$totalAmt"
          },
            totalDiscount: {
            $sum: "$discountAmt"
          },
        }
      }
    
  ]);
      res.status(200).json(hotelbookings);
    } catch (err) {
      next(err);
    }
  };
  export const getRevenueForSingle = async (req, res, next) => {
    try {

      const hotelbookings = await HotelBooking.aggregate([
        {
          $group:
            {
              _id: "$h_id",
              total: {
                $sum: "$totalAmt",
              },
            },
        },
        {
          $match:
            {
              _id: new mongoose.Types.ObjectId(req.params.id),
            },
        },
      ]);
      res.status(200).json(hotelbookings[0]);
    } catch (err) {
      next(err);
    }
  };
  
  export const VerifyBooking = async (req,res,next)=>{
    try {
      const updatedHotelBooking = await HotelBooking.findByIdAndUpdate(
        req.params.id,{$set :{verified:true}},{ new: true }
      );
      res.status(200).json(updatedHotelBooking);
    } catch (err) {
      next(err);
    }
  }

  export const getChartData = async (req, res, next) => {

    try {

      const hotelbookings = await HotelBooking.aggregate([
        {
          $match:
            {
              h_id: new mongoose.Types.ObjectId(
                req.params.id
              ),
              bookingdate: {
                $gt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
              },
            },
        },
        {
          $group:
            {
              _id: {
                month: {
                  $month: "$bookingdate",
                },
                year :{
                  $year:"$bookingdate",
                }
              },
              revenue: {
                $sum: "$totalAmt",
              },
              booking: {
                $sum: 1,
              },
            },
        },
        {
      $sort:{
        "_id.year":1,
        "_id.month":1
      }
    }
      ]);
      res.status(200).json(hotelbookings);
    } catch (err) {
      next(err);
    }
  };