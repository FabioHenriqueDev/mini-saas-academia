import z from 'zod';
import { AuthorizationError } from '../../errors/authorizationError';

export type Exercise = z.infer<typeof schemaExercise>;

const schemaExercise = z.object({
    id_user: z.number('Needed ID of User').int().positive(),
    id_personal: z.number('Needed ID of Personal').int().positive(),
    exercise_name: z.string().min(5, 'Exercise name needed to be 5 characters.'),
    description: z.string().nullable().optional(),
    series: z.number('Please fill in the series field.').int().positive(),
    repetitions: z.number('Please fill in the repetitions field.').int().positive()  
});

export const biuldExercise = (id_user: number, id_personal: number, exercise_name: string, description: string, series: number, repetitions: number): Exercise => {
    const exercise = { id_user, id_personal, exercise_name, description, series, repetitions };

    const validation = schemaExercise.safeParse(exercise);
    if(!validation.success) throw new AuthorizationError('InvalidFieldsExeption', JSON.stringify(validation.error.format()), 400);

    return exercise;
}