import express from "express";

import {
    getThings,
    getThing,
    createThing,
    modifyThing,
    deleteThing
} from "../controllers/things";

import authenticateToken from "../middleware/auth";
import validateObjectId from "../middleware/object_id";

const router = express.Router();

router.use(authenticateToken);

router.get("/", getThings);
router.get("/:id", validateObjectId, getThing);
router.post("/", createThing);
router.put("/:id", validateObjectId, modifyThing);
router.delete("/:id", validateObjectId, deleteThing);

export default router;