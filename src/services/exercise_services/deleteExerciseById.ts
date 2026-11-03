import { AuthorizationError } from "../../errors/authorizationError";
import { ExercisesErrors } from "../../errors/exerciseErrors";
import { IExerciseRepository } from "../../repository/exerciseRepository";
import { UserRepository } from "../../repository/userRepository";

export const deleteExerciseById = async (id: number, repositoryExercise: IExerciseRepository, idPersonal: number) => {
    const repositoryUser = UserRepository;
    
    const exists = await repositoryExercise.findExerciseById(id);
    if (!exists) throw new ExercisesErrors('ExerciseNotFoundExeption', 'Exercise not found in database', 404);

    const existingPersonal = await repositoryUser.findUserById(idPersonal);
    if (!existingPersonal?.personal) throw new AuthorizationError("UserIsNotPersonal", "User needed to be a personal", 401)

    let exerciseDeleted = await repositoryExercise.deleteExerciseById(id)
    return exerciseDeleted
}