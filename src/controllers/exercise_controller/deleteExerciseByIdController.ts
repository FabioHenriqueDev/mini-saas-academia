import type { RequestHandler } from "express";
import { UserErrors } from "../../errors/userErrors";
import { AuthorizationError } from "../../errors/authorizationError";
import * as ExerciseService from '../../services/exercise_services/deleteExerciseById'
import { ExerciseRepository } from "../../repository/exerciseRepository";


export const deleteExerciseById: RequestHandler = async (req, res) => {
    try{
        const { id } = req.body
        console.log(id)
        
        const exerciseDeleted = await ExerciseService.deleteExerciseById(id, ExerciseRepository)
        
        res.status(200).json({sucess: true, exerciseDeleted})
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