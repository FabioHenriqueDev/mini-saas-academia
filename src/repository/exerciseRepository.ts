import { prisma } from "../database/prisma";
import { Exercise as ExerciseEntities } from "../domain/entities/exerciseEntities";
import { Exercise } from '@prisma/client';

export type IExerciseRepository = {
    createExercise(exercise: ExerciseEntities): Promise<ExerciseEntities>
    deleteExerciseById(id: number): Promise<Exercise>
    findExerciseById(id: number): Promise<Exercise | null>
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

    deleteExerciseById: async (id) => {
    return prisma.exercise.delete({
        where: {
            id
        },
        select: {
                id: true,
                exercise_name: true,
                series: true,
                createdAt: true,
                updatedAt: true,
                id_personal: true,
                id_user: true,
                description: true,
                repetitions: true
            }
        });
    },

    findExerciseById: async (id) => {
        return prisma.exercise.findUnique({
            where: { id },
            select: {
                id: true,
                exercise_name: true,
                series: true,
                createdAt: true,
                updatedAt: true,
                id_personal: true,
                id_user: true,
                description: true,
                repetitions: true
            }
        })
    }
}