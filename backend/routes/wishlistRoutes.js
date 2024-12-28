import { Router } from "express"
import { create, getByUserId, updateById, deleteById } from "../controllers/Wishlist"
const router=Router()


router
    .post("/",create)
    .get("/user/:id",getByUserId)
    .patch("/:id",updateById)
    .delete("/:id",deleteById)

export default router;