import { ctrlWrapper } from "../decorators/index.js";
import Event from "../models/Event.js"



const getAll = async (req, res) => {
    const result = await Event.find();
    console.log(result)
    res.json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Event.findById(id);
    res.json(result);
}



export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    
};
