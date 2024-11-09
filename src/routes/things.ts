import express from "express";

import {
    getThings,
    getThing,
    createThing,
    modifyThing,
    deleteThing
} from "../controllers/things";

const router = express.Router();

router.get("/", getThings);
router.get("/:id", getThing);
router.post("/", createThing);
router.put("/:id", modifyThing);
router.delete("/:id", deleteThing);

export default router;