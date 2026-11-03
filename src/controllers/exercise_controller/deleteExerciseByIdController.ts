import type { RequestHandler } from "express";
import { AuthorizationError } from "../../errors/authorizationError";
import * as ExerciseService from '../../services/exercise_services/deleteExerciseById'
import { ExerciseRepository } from "../../repository/exerciseRepository";
import { ExercisesErrors } from "../../errors/exerciseErrors";


export const deleteExerciseById: RequestHandler = async (req, res) => {
    try{
        const { id: idExercise } = req.body
        const idPersonal  = req.user.id
        console.log(idExercise, idPersonal)
        
        const exerciseDeleted = await ExerciseService.deleteExerciseById(idExercise, ExerciseRepository, idPersonal)
        
        res.status(200).json({sucess: true, exerciseDeleted})
    } catch(error) {
        if(error instanceof ExercisesErrors || error instanceof AuthorizationError){
            res.status(error.statusCode).json({ error: error.message });
            console.log(error);
        } else {
            res.status(500).json({ error });
            console.log(error);
        }
        
    }
}