import Booking from "../models/Bookings";
import Show from "../models/Show";
import User from "../models/User";

export const isAdmin = async (req, res) => {
      res.json({success: true, isAdmin: true})
}

export const getDashboardData = async (req, res) =>{
    try{
        const booikngs= await Booking.find({isPaid: true});
        const activeShows = await Show.find({showDateTime: {$gte: new Date()}}).
        populate('movie');

        const totalUser= await User.countDocuments();
        
        const getDashboardData = {
            totalBookings: booikngs.length,
            totalRevenue: booikngs.reduce((acc, booking)=> acc + booking.amount,0),
            activeShows,
            totalUser
        }

        res.json({success: true, dashboardData})
    }catch(error){
           console.error(error);
           res.json({success: false, message: error.message})
    }

}
export const getAllShows = async (req, res) =>{
    try {
       const shows = await Show.find({showDateTime: {$gte: new Date()}}).
        populate('movie').sort({ showDateTime: 1});
        res.json({success: true, shows})
    }catch(error) {
        console.error(error);
        res.json({success: false, message: error.message})
    }
}