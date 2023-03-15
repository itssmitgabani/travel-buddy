import mongoose, { Schema } from "mongoose";
const HotelBookingSchema = new mongoose.Schema({
  u_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  h_id: {
    type: Schema.Types.ObjectId,
    ref: "Hotel"
  },
  adult: {
    type: Number,
    required: true,
    min: 1,
  },
  children: {
    type: Number,
    required: true,
    min: 0,
  },
  rooms: {
    type: Number,
    required: true,
    min: 0,
  },
  totalAmt: {
    type: Number,
    required: true,
    min: 1,
  },
  discountAmt: {
    type: Number,
    required: true,
    min: 1,    
  },
  bookingdate:{
    type:Date,
    required:true,
  },
  todate:{
    type:Date,
    required:true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
},{ timestamps: true }
);

export default mongoose.model("HotelBooking", HotelBookingSchema)