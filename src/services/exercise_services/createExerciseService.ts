import * as ExerciseEntities from "../../domain/entities/exerciseEntities";
import { AuthorizationError } from "../../errors/authorizationError";
import { ExercisesErrors } from "../../errors/exerciseErrors";
import { UserErrors } from "../../errors/userErrors";
import { IExerciseRepository } from "../../repository/exerciseRepository";
import { IUserRepository } from "../../repository/userRepository";


export const createExercise = async (
        id_user: number, 
        id_personal: number, 
        exercise_name: string, 
        description: string, 
        series: number, 
        repetitions: number, 
        repositoryUser: IUserRepository,
        repositoryExercise: IExerciseRepository
    ) => {
    
    const exercise = ExerciseEntities.biuldExercise(id_user, id_personal, exercise_name, description, series, repetitions)
    
    const personal = await repositoryUser.findUserById(id_personal);
    if(!personal?.personal) throw new AuthorizationError('IsNotPersonalExeption', 'You need to be a personal trainer to access this route', 401); // nao autorizado
    
    const userExists = await repositoryUser.findUserById(id_user)
    if(!userExists) throw new UserErrors('UserNotFoundExeption', 'User not found in database', 404); // usuario nao encontrado
    if(userExists.personal) throw new AuthorizationError('AuthorizationErrorExeption', 'User is a personal', 400); // se o usuario for um personal nao pode criar um exercicio
   
    const exerciseCreated = repositoryExercise.createExercise(exercise)
    
    return exerciseCreated;
}