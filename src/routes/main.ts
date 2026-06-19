import { Router } from "express";
import { createUser } from "../controllers/createUserController";
import { editUserByID} from "../controllers/editUserByIdController";
import { getUserByCpf } from "../controllers/getUserByCpfController";
import { getUserById } from "../controllers/getUserByIdController";

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200).json({pong: true});
})

router.post('/users', createUser);

// Rota que vai exigir autenticação
router.put('/users', editUserByID);

// Rota que vai exigir autenticação e ser um personal training
router.get('/users/cpf/:cpf', getUserByCpf)

// Rota que vai exigir autenticação e ser um personal training
router.get('/users/:id', getUserById)

export default router; 