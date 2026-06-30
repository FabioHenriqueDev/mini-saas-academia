import { Router } from "express";
import { createUser } from "../controllers/user_controller/createUserController";
import { editUserByID} from "../controllers/user_controller/editUserByIdController";
import { getUserByCpf } from "../controllers/user_controller/getUserByCpfController";
import { getUserById } from "../controllers/user_controller/getUserByIdController";
import { loginUser } from "../controllers/user_controller/loginUserController";
import { verifyJwtMiddleware } from "../middlewares/authMiddleware";
import { verifyJwtMiddlewarePersonal } from "../middlewares/authMiddlewaresPersonal";
import { createExercise } from "../controllers/exercise_controller/createExerciseController";

const router = Router();

// USERS:
    router.post('/users', createUser);
    router.post('/users/login', loginUser);

    // Rota que vai exigir autenticação
    router.put('/users', verifyJwtMiddleware, editUserByID);

    // Rota que vai exigir autenticação e ser um personal training
    router.get('/users/cpf/:cpf', verifyJwtMiddlewarePersonal, getUserByCpf);
    router.get('/users/:id', verifyJwtMiddlewarePersonal, getUserById);

// EXERCICES:

    router.post('/exercises', verifyJwtMiddlewarePersonal, createExercise)

export default router; 