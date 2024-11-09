import express from "express";

import {
    getSpaces,
    getSpace,
    createSpace,
    modifySpace,
    deleteSpace
} from "../controllers/spaces";


const router = express.Router();

router.get("/", getSpaces);
router.get("/:id", getSpace);
router.post("/", createSpace);
router.put("/:id", modifySpace);
router.delete("/:id", deleteSpace);

export default router;