import type { RequestHandler } from "express";
import * as ExerciseService from '../../services/exercise_services/editExerciseByIdService'
import { AuthorizationError } from "../../errors/authorizationError";
import { ExercisesErrors } from "../../errors/exerciseErrors";


export const editExercisebyID: RequestHandler = async (req, res) => {
    const { id_user, id_exercise, exercise_name, description, series, repetitions } = req.body;
    const idPersonal = req.user.id;
    console.log(idPersonal)

    try{
       const exerciseEdited = await ExerciseService.editExerciseById(
            id_exercise,
            id_user,
            idPersonal,
            exercise_name,
            description,
            series,
            repetitions
       )
       
       res.status(200).json({sucess: true, exerciseEdited});
    } catch(error) {
        if(error instanceof AuthorizationError || error instanceof ExercisesErrors){
            res.status(error.statusCode).json({ error: error.message });
            console.log(error);
        } else {
            res.status(500).json({ error });
            console.log(error);
        }
        
    }
}