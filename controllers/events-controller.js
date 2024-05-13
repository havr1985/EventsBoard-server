import { ctrlWrapper } from "../decorators/index.js";
import Event from "../models/Event.js"
import User from "../models/User.js";



const getAll = async (req, res) => {
    const { page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;
    const totalCount = await Event.countDocuments();
    const totalPage = Math.ceil(totalCount / limit);
    const result = await Event.find().skip(skip).limit(limit);
    res.json({
        result,
        totalPage
    });
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Event.findById(id);
    const user = await User.find();
    const subUser = user.filter((item) => item.subscribed.includes(id));
    console.log(subUser)
    res.json({
        result,
        subUser
    });
}



export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    
};
