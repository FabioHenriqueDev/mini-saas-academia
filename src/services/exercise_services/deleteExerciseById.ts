import { ExercisesErrors } from "../../errors/exerciseErrors";
import { IExerciseRepository } from "../../repository/exerciseRepository";
import { IUserRepository } from "../../repository/userRepository";


export const deleteExerciseById = async (id: number, repositoryExercise: IExerciseRepository, repositoryUser: IUserRepository, idUser: number) => {
    const exists = await repositoryExercise.findExerciseById(id);
    if (!exists) throw new ExercisesErrors('ExerciseNotFoundExeption', 'Exercise not found in database', 404);

    let exerciseDeleted = await repositoryExercise.deleteExerciseById(id)
    return exerciseDeleted
}