import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

class cartManager {
    async addCart() {
        try {
            const newCart = new CartModel({products: []});
            await newCart.save();
            return newCart._id;
        } catch (error) {
            console.log("Error al agregar el nuevo carrito:", error);
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await CartModel.findById(cartId);

            if (!cart) {
                console.error(`El producto con ID "${cartId}" no existe.`);
                return;
            };

            const product = await ProductModel.findById(productId);

            if(!product) {
                console.error(`El producto con ID "${productId}" no existe.`);
                return;
            }

            console.log(cart.products);

            const existingProduct = cart.products.find(prod => prod.product._id.toString() === productId);
            /* console.log("Producto repetido", existingProduct); */

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({
                    product: product/* productId */,
                    quantity: quantity
                });
            }

            cart.markModified("products");

            await cart.save();
            console.log(`Producto con ID "${productId}" agregado al carrito con ID ${cartId}`);
        } catch (error) {
            console.log("Error al agregar el producto al carrito", error);
        }
    }

    async getCartProducts(cartId) {
        try {
            const cart = await CartModel.findById(cartId);

            if (!cart) {
                console.error(`El carrito con ID "${cartId}" no existe.`);
                return;
            }

            return cart.products;
        } catch (error) {
            console.error("Error al obtener los productos del carrito:", error);
        }
    }
}

export default cartManager;