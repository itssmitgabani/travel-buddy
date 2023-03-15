import mongoose from "mongoose";
import AirlineBooking from "../models/airlinebooking.js";

export const bookAirline = async (req,res,next)=>{
    const airlineBook = new AirlineBooking(req.body);
    try{
        const savedBookAirline = await airlineBook.save();
        res.status(200).json("airline booked successfully");
    }catch(err){
        next(err)
    }
}

export const getAirlineBooking = async (req, res, next) => {
    try {
      const airlinebooking = await AirlineBooking.findById(req.params.id);
      res.status(200).json(airlinebooking);
    } catch (err) {
      next(err);
    }
  };
  export const getAirlineBookings = async (req, res, next) => {
    try {
      const airlinebookings = await AirlineBooking.aggregate([
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
              from: "airlines",
              localField: "a_id",
              foreignField: "_id",
              as: "airline",
            },
        },
        {
          $unwind:
            {
              path: "$airline",
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
                hotelname: "$airline.airlinename"
            
          },
        },
      ]);
      res.status(200).json(airlinebookings);
    } catch (err) {
      next(err);
    }
  };

  export const getAirlineBookingCount = async (req, res, next) => {
    try {
      const airlinebookings = await AirlineBooking.countDocuments();
      res.status(200).json(airlinebookings);
    } catch (err) {
      next(err);
    }
  };
  export const getAirlineBookingCountForSingle = async (req, res, next) => {
    try {
      const airlinebookings = await AirlineBooking.countDocuments({a_id: new mongoose.Types.ObjectId(req.params.id)});
      res.status(200).json(airlinebookings);
    } catch (err) {
      next(err);
    }
  };


  export const getTotal = async (req, res, next) => {
    try {

      const airlinebookings = await AirlineBooking.aggregate([{
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
      res.status(200).json(airlinebookings);
    } catch (err) {
      next(err);
    }
  };

  export const getRevenue = async (req, res, next) => {
    try {

      const airlinebookings = await AirlineBooking.aggregate([
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
      res.status(200).json(airlinebookings);
    } catch (err) {
      next(err);
    }
  };
  
  export const getRevenueForSingle = async (req, res, next) => {
    try {

      const airlinebookings = await AirlineBooking.aggregate([
        {
          $group:
            {
              _id: "$a_id",
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
      res.status(200).json(airlinebookings[0]);
    } catch (err) {
      next(err);
    }
  };
  
  export const VerifyBooking = async (req,res,next)=>{
    try {
      const updatedAirlineBooking = await AirlineBooking.findByIdAndUpdate(
        req.params.id,{$set :{verified:true}},{ new: true }
      );
      res.status(200).json(updatedAirlineBooking);
    } catch (err) {
      next(err);
    }
  }

  export const getChartData = async (req, res, next) => {

    try {

      const airlinebookings = await AirlineBooking.aggregate([
        {
          $match:
            {
              a_id: new mongoose.Types.ObjectId(
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
      res.status(200).json(airlinebookings);
    } catch (err) {
      next(err);
    }
  };