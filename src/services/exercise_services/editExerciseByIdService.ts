import { AuthorizationError } from "../../errors/authorizationError";
import { ExercisesErrors } from "../../errors/exerciseErrors";
import { ExerciseRepository } from "../../repository/exerciseRepository";
import { UserRepository } from "../../repository/userRepository";
import { biuldExercise } from "../../domain/entities/exerciseEntities";


export const editExerciseById = async (
    idExercise: number,
    idUser: number, 
    idPersonal: number, 
    exerciseName: string, 
    description: string, 
    series: number, 
    repetitions: number) => {
    
    // Validar informações enviadas pelo usuario
    const validadeExercise = await biuldExercise(idUser, idPersonal, exerciseName, description, series, repetitions)

    // Verificar se o exercicio existe
    const existsExercise = await ExerciseRepository.findExerciseById(idExercise)
    if (!existsExercise) throw new ExercisesErrors("ExerciseNotFound", "This exercise does not exist in the database", 404)
    
    // Verificar se aquele exercicio pertence aquele personal
    if(!(existsExercise.id_personal === idPersonal)) throw new AuthorizationError("UnauthorizedExerciseAccessExceptionl", "This exercise does not belong to this personal trainer.", 401)
    
    const exerciseEdited = ExerciseRepository.editExerciseById(idExercise, validadeExercise)
    
    return exerciseEdited
}