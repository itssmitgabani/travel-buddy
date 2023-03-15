import mongoose, { Schema } from "mongoose";
const AirlineBookingSchema = new mongoose.Schema({
  u_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  a_id: {
    type: Schema.Types.ObjectId,
    ref: "Airline"
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
  seats: {
    type: Number,
    required: true,
    min: 1,
  },
  bookingdate:{
    type:Date,
    required:true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  
},{ timestamps: true }
);

export default mongoose.model("AirlineBooking", AirlineBookingSchema)