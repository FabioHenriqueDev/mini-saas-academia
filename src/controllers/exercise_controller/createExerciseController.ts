import type { RequestHandler } from "express";
import { UserRepository } from "../../repository/userRepository";
import { ExercisesErrors } from "../../errors/exerciseErrors";
import * as ExerciseService from '../../services/exercise_services/createExerciseService'
import { ExerciseRepository } from "../../repository/exerciseRepository";
import { UserErrors } from "../../errors/userErrors";
import { AuthorizationError } from "../../errors/authorizationError";


export const createExercise: RequestHandler = async (req, res) => {
    const { id_user, exercise_name, description, series, repetitions } = req.body;
    const idPersonal = req.user.id;
    console.log(idPersonal)

    try{
        const exercise = await ExerciseService.createExercise( 
                id_user, 
                idPersonal, 
                exercise_name, 
                description, 
                series, 
                repetitions, 
                UserRepository,
                ExerciseRepository
        );
        res.status(201).json({sucess: true, exercise});
    } catch(error) {
        if(error instanceof AuthorizationError || error instanceof UserErrors){
            res.status(error.statusCode).json({ error: error.message });
            console.log(error);
        } else {
            res.status(500).json({ error });
            console.log(error);
        }
        
    }
}