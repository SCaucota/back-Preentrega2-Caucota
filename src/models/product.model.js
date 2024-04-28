import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

/* const populateId = function(next) {
    this.populate("_id");
    next();
} */

productSchema.pre("find", function(){
    this.populate("category");
})

productSchema.pre("findById", function(){
    this.populate("_id")
})
/* productSchema.pre("findById", populateId);
productSchema.pre("findByIdAndUpdate", populateId);
productSchema.pre("findByIdAndDelete", populateId); */

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;
