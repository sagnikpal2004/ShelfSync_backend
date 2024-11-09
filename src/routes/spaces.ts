import express from "express";

import {
    getSpaces,
    getSpace,
    createSpace,
    modifySpace,
    deleteSpace
} from "../controllers/spaces";

import authenticateToken from "../middleware/auth";
import validateObjectId from "../middleware/object_id";

const router = express.Router();

router.use(authenticateToken);

router.get("/", getSpaces);
router.get("/:id", validateObjectId, getSpace);
router.post("/", createSpace);
router.put("/:id", validateObjectId, modifySpace);
router.delete("/:id", validateObjectId, deleteSpace);

export default router;