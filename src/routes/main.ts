import { Router } from "express";
import { createUser } from "../controllers/createUserController";
import { editUserByID} from "../controllers/editUserByIdController";

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200).json({pong: true});
})

router.post('/users', createUser);

// Rota que vai exigir autenticação
router.put('/users', editUserByID);

export default router; 