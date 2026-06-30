import { prisma } from "../database/prisma";
import { Exercise } from "../domain/entities/exerciseEntities";

export type IExerciseRepository = {
    createExercise(exercise: Exercise): Promise<Exercise>
}

export const ExerciseRepository: IExerciseRepository = {
    createExercise: async (exercise) => {
        return await prisma.exercise.create({
            data: exercise,
            select: {
                id: true,
                exercise_name: true,
                description: true,
                series: true,
                repetitions: true,
                id_user: true,
                id_personal: true,
                createdAt: true,
                updatedAt: true
            }
        });
    },
}