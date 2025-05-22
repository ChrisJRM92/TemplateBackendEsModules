import Model_name from "../models/Model.js";
import catchError from "../utils/catchError.js";

const getAll = catchError(async(req, res)=>{
    return res.json(/* value to be return*/)
});

export default { 
    getAll 
};