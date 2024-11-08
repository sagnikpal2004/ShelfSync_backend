import express from "express";

import {
    getSpaces,
    getSpace
} from "../controllers/spaces";


const router = express.Router();

router.get("/", getSpaces);
router.get("/:id", getSpace);

export default router;