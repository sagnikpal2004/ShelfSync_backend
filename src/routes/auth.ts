import express from "express";

import { 
    getProfile,
    login, 
    register 
} from "../controllers/auth";
import authenticateToken from "../middleware/auth";


const router = express.Router();

router.get("/", authenticateToken, getProfile);
router.post("/login", login);
router.post("/register", register);

export default router;