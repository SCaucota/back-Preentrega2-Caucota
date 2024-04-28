import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: Object, /* mongoose.Schema.Types.ObjectId, */
                /* ref: "products" */
            },
            quantity: {
                type:Number, 
                required: true
            }
        }
    ]
})

cartSchema.pre("findOne", function(next){
    this.populate("products.product");
    next();
})

const CartModel = mongoose.model("carts", cartSchema);

export default CartModel;