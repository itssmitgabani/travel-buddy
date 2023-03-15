import Admin from "../models/admin.js";
import Hotel from "../models/hotel.js"
import Airline from "../models/airline.js"
import User from "../models/user.js"
import Token from "../models/token.js"
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import validator from 'validator';
import crypto from "crypto"
import { sendEmail } from "../utils/email.js";


export const adminregister = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newAdmin = new Admin({
      ...req.body,
      password: hash,
      img: req.body.img==="" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOy82yDB7J2umGoJgo03iwxwDmpXTPfjzDyQ9BiiP7puTOh548G20OhHw6dfGc-LaQmrc&usqp=CAU": req.body.img 
    });

    await newAdmin.save();
    res.status(200).send("Admin has been created.");
  } catch (err) {
    next(err);
  }
};


export const adminlogin = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return next(createError(404, "admin not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong email or password!"));

    const token = jwt.sign(
      { id: admin._id},
      process.env.JWT
    );

    const { password, ...otherDetails } = admin._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }});
  } catch (err) {
    next(err);
  }
};



export const airlineregister = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newAirline = new Airline({
      ...req.body,
      password: hash,
      img: req.body.img==="" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOy82yDB7J2umGoJgo03iwxwDmpXTPfjzDyQ9BiiP7puTOh548G20OhHw6dfGc-LaQmrc&usqp=CAU": req.body.img ,
    });

    await newAirline.save();

    
    let token = await new Token({
      userId: newAirline._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    
    const message = `${process.env.BASE_URL}/auth/airline/verify/${newAirline.id}/${token.token}`;
    await sendEmail(newAirline.email, "Verify Email", message);

    res.status(200).send("Airline has been created.");
  } catch (err) {
    next(err);
  }
};

export const airlineVerify = async (req, res, next) => {
  try {
    const airline = await Airline.findOne({ _id: req.params.id });
    if (!airline) return next(createError(400, "invalid link!"));

    const token = await Token.findOne({
      userId: airline._id,
      token: req.params.token,
    });
    if (!token) return next(createError(400, "invalid link!"));

    await Airline.updateOne({ _id: airline._id},{ verified: true });
    await Token.findByIdAndRemove(token._id);

    res.send("email verified sucessfully... \n now you can login");
  } catch (error) {
    next(error)
  }
};

export const airlinelogin = async (req, res, next) => {
  try {
    const airline = await Airline.findOne({ email: req.body.email });
    if (!airline) return next(createError(404, "airline not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      airline.password
    );
    
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong email or password!"));

      if(!airline.verified){
        return next(createError(400, "please check your email and verify your account"));
      }
    const token = jwt.sign(
      { id: airline._id},
      process.env.JWT
    );

    const { password, ...otherDetails } = airline._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }});
  } catch (err) {
    next(err);
  }
};


export const hotelregister = async (req, res, next) => {
  try {
    if(!validator.isEmail(req.body.email)){
      return next(createError(401, "enter valid email!"));
    }
    
    const hotel = await Hotel.findOne({ email: req.body.email });
    if (hotel) return next(createError(404, "email already exist!"));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newHotel = new Hotel({
      ...req.body,
      password: hash,
      img: req.body.img==="" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOy82yDB7J2umGoJgo03iwxwDmpXTPfjzDyQ9BiiP7puTOh548G20OhHw6dfGc-LaQmrc&usqp=CAU": req.body.img ,
    });

    await newHotel.save();

    let token = await new Token({
      userId: newHotel._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    
    const message = `${process.env.BASE_URL}/auth/hotel/verify/${newHotel.id}/${token.token}`;
    await sendEmail(newHotel.email, "Verify Email", message);

    res.status(200).send("Hotel has been created.");
  } catch (err) {
    next(err)
  }
};


export const hotelVerify = async (req, res, next) => {
  try {
    const hotel = await Hotel.findOne({ _id: req.params.id });
    if (!hotel) return next(createError(400, "invalid link!"));

    const token = await Token.findOne({
      userId: hotel._id,
      token: req.params.token,
    });
    if (!token) return next(createError(400, "invalid link!"));

    await Hotel.updateOne({ _id: hotel._id},{ verified: true });
    await Token.findByIdAndRemove(token._id);

    res.send("email verified sucessfully... \n now you can login");
  } catch (error) {
    next(error)
  }
};


export const hotellogin = async (req, res, next) => {
  try {
    const hotel = await Hotel.findOne({ email: req.body.email });
    if (!hotel) return next(createError(404, "hotel not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      hotel.password
    );
    
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong email or password!"));

      if(!hotel.verified){
        return next(createError(400, "please check your email and verify your account"));
      }
    const token = jwt.sign(
      { id: hotel._id},
      process.env.JWT
    );

    const { password, ...otherDetails } = hotel._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }});
  } catch (err) {
    next(err);
  }
};

export const userregister = async (req, res, next) => {
  const regex = new RegExp("(0|91)?[6-9][0-9]{9}");
  try {
    if(!validator.isEmail(req.body.email)){
      return next(createError(401, "enter valid email!"));
    }
    if(!regex.test(req.body.mobileno))
  {
    return next(createError(401, "enter valid mobile no!"));
  }

  
  const user = await User.findOne({ email: req.body.email });
  if (user) return next(createError(404, "email already exist!"));


    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
      img: req.body.img==="" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOy82yDB7J2umGoJgo03iwxwDmpXTPfjzDyQ9BiiP7puTOh548G20OhHw6dfGc-LaQmrc&usqp=CAU": req.body.img ,
    });

    await newUser.save();

    let token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    
    const message = `${process.env.BASE_URL}/auth/user/verify/${newUser.id}/${token.token}`;
    await sendEmail(newUser.email, "Verify Email", message);


    res.status(200).send("User has been created.");
  } catch (err) {
    console.log(err)
    next(err);
  }
};


export const userVerify = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return next(createError(400, "invalid link!"));

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return next(createError(400, "invalid link!"));

    await User.updateOne({ _id: user._id},{ verified: true });
    await Token.findByIdAndRemove(token._id);

    res.send("email verified sucessfully... \n now you can login");
  } catch (error) {
    next(error)
  }
};


export const userLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "user not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong email or password!"));

      if(!user.verified){
        return next(createError(400, "please check your email and verify your account"));
      }
    const token = jwt.sign(
      { id: user._id},
      process.env.JWT
    );

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }});
  } catch (err) {
    next(err);
  }
};
