import { ExercisesErrors } from "../../errors/exerciseErrors";
import { IExerciseRepository } from "../../repository/exerciseRepository";

export const deleteExerciseById = async (id: number, repositoryExercise: IExerciseRepository) => {
    const exists = await repositoryExercise.findExerciseById(id);
    if (!exists) throw new ExercisesErrors('ExerciseNotFoundExeption', 'Exercise not found in database', 404);

    let exerciseDeleted = await repositoryExercise.deleteExerciseById(id)
    return exerciseDeleted
}