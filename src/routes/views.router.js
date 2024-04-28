import express from "express";
import { Router } from "express";
import ProductManager from "../controllers/productManager.js";
import ProductModel from "../models/product.model.js";
const router = Router();
const productManager = new ProductManager;


router.get("/", async (req, res) => {
    try{

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        const query = {};

        if(req.query.type) {
            query.category = req.query.type;
        }

        let sortOptions = {};
        if(req.query.sort && (req.query.sort === "asc" || req.query.sort === "desc")) {
            sortOptions.price = req.query.sort;
        }

        const books = await ProductModel.paginate(query, {limit, page, sort: sortOptions});

        const librosResultadoFinal = books.docs.map(book => {
            const {_id, ...rest} = book.toObject();
            return rest;
        })

        res.render("home", {
            status: "success",
            products: librosResultadoFinal,
            totalPages: books.totalPages,
            prevPage: books.prevPage,
            nextPage: books.nextPage,
            page: books.page,
            hasPrevPage: books.hasPrevPage,
            hasNextPage: books.hasNextPage,
            prevLink: books.hasPrevPage ? `/?page=${books.prevPage}&limit=${limit}` : null,
            nextLink: books.hasNextPage ? `/?page=${books.nextPage}&limit=${limit}` : null
        });

        /* const dataForRender = {
            products: librosResultadoFinal,
            totalPages: books.totalPages,
            prevPage: books.prevPage,
            nextPage: books.nextPage,
            page: books.page,
            hasPrevPage: books.hasPrevPage,
            hasNextPage: books.hasNextPage,
            prevLink: books.hasPrevPage ? `/?page=${books.prevPage}&limit=${limit}` : null,
            nextLink: books.hasNextPage ? `/?page=${books.nextPage}&limit=${limit}` : null
        };

        console.log({
            status: "success",
            ...dataForRender
        });

        res.render("home", dataForRender); */

    }catch (error){
        res.status(500).json({error: "Error interno del servidor"});
    }
});

router.get("/chat", async (req, res) => {
    res.render("chat");
})

router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");
});

export default router;