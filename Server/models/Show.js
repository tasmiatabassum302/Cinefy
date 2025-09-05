import mongoes from "mongoose";
const shoeSchema =new mongoes.Schema(
    {
        movie:{type:String,required:true, ref:'Movie'}
        showDateTime{type:Data,required:true },
        showPrice:{type:Number,required:true},
        occupiedSeats: { type: Object, default:{} }
    }, {minimum: false}
)
const Show = mongoes.model("Show",shoeSchema);
export default Show;
