import { Router } from "express";
import { createUser } from "../controllers/user_controller/createUserController";
import { editUserByID} from "../controllers/user_controller/editUserByIdController";
import { getUserByCpf } from "../controllers/user_controller/getUserByCpfController";
import { getUserById } from "../controllers/user_controller/getUserByIdController";
import { loginUser } from "../controllers/user_controller/loginUserController";

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200).json({pong: true});
})

router.post('/users', createUser);
router.post('/users/login', loginUser)

// Rota que vai exigir autenticação
router.put('/users', editUserByID);

// Rota que vai exigir autenticação e ser um personal training
router.get('/users/cpf/:cpf', getUserByCpf)

// Rota que vai exigir autenticação e ser um personal training
router.get('/users/:id', getUserById)

export default router; 