import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200).json({pong: true});
})

router.post('/users', UserController.createUser)

export default router;