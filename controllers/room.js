import mongoose, { Mongoose } from "mongoose";
import Hotel from "../models/hotel.js";
import Room from "../models/room.js";
import { createError } from "../utils/error.js";
export const addRoom = async (req,res,next)=>{
    const newRoom = new Room(req.body);
    try{
        const room = await newRoom.save();
        await Hotel.findByIdAndUpdate(
            room.h_id,{$push:{"rooms":room._id}},{ new: true }
          );
        res.status(200).json("room created successfully");
    }catch(err){
        next(createError(500, "All fields required"))
    }
}
export const findRoom = async (req,res,next)=>{
    try{
        const room = await Room.findById(req.params.id
          );
        res.status(200).json(room);
    }catch(err){
        next(createError(500, "All fields required"))
    }
}
export const updateRoom = async (req,res,next)=>{
    try{
        const room = await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{ new: true }
          );
        res.status(200).json(room);
    }catch(err){
        next(createError(500, "All fields required"))
    }
}
export const getTotalRoom = async (req,res,next)=>{
    try{
        
      const totalRoom = await Room.aggregate([
        {
          $match:
            {
              h_id: new mongoose.Types.ObjectId(req.params.id)  
            },
        },
        {
          $project:
            {
              roomnumbers: 1,
              room: {
                $size: "$roomnumbers",
              },
              token: "t",
            },
        },
        {
          $group:
            {
              _id: "$token",
              total: {
                $sum: "$room",
              },
            },
        },
      ]);
      res.status(200).json(totalRoom[0]);
    }catch(err){
        next(createError(500, "All fields required"))
    }
}

export const findRoomByCity = async (req, res, next) => {
  const { min, max, city ,sort} = req.query;
  const a = parseInt(min)
  const b = parseInt(max)
  const s = parseInt(sort)
  try {
    const rooms = await Room.aggregate(
      [
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
          $project: {
            hotelname: "$hotel.hotelname",
            city: "$hotel.city",
            star: "$hotel.category",
            h_id: 1,
            price: 1,
            amenities: 1,
            address: "$hotel.address",
            img:1,
            category:1,
          },
        },
        {
          $match:
            {
              city : city,
              price: { $gte: a , $lte : b}
            },
        },
        {
          $sort:
            {
              price: s,
            },
        },
      ]
    );
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const findSingleRoom = async (req,res,next)=>{
  try{
      const room = await Room.aggregate([
        {
          $match:
            {
              _id: new mongoose.Types.ObjectId(req.params.id),
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
  
]);
      res.status(200).json(room);
  }catch(err){
      next(createError(500, "All fields required"))
  }
}


export const findWishlistRoom = async (req, res, next) => {
  try {
    const rooms = await Room.aggregate(
      [{
        $match:
          {
            _id : new mongoose.Types.ObjectId(req.params.rid)
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
          $project: {
            hotelname: "$hotel.hotelname",
            city: "$hotel.city",
            star: "$hotel.category",
            h_id: 1,
            price: 1,
            amenities: 1,
            address: "$hotel.address",
            img:1,
            category:1,
          },
        },
        
      ]
    );
    res.status(200).json(rooms[0]);
  } catch (err) {
    next(err);
  }
};
