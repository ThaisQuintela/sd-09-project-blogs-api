const rescue = require('express-rescue');
const Joi = require('joi');
const validate = require('../middelwares/validate');

const { createToken } = require('../utils/createToken');
const { validateToken } = require('../utils/validateToken');
const {
    createUserService,
    findAllUsers,
    findById,
} = require('../services/userService');

const userSchema = Joi.object({
    displayName: Joi.string().min(8),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
});

const createUser = [
    validate(userSchema),
    rescue(async (req, res) => {
      const { displayName, email, password, image } = req.body;
      await createUserService(displayName, email, password, image);
      const token = createToken({ displayName, email, password, image });
      
      return res.status(201).json({ token });
})];

const findAllUser = rescue(async (req, res, next) => {
    const token = req.headers.authorization;
    const userInfos = validateToken(token);

    if (userInfos.error) {
        return next({
            statusCode: 401,
            message: userInfos.error,
        }); 
    }

    const allUsers = await findAllUsers();
    return res.send(allUsers);
});

const findUserById = rescue(async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params; 
    const userInfos = validateToken(token);
    
    if (userInfos.error) {
        return next({
            statusCode: 401,
            message: userInfos.error,
        }); 
    }

    const userFinded = await findById(id);
    if (userFinded.error) return next({ statusCode: 404, message: userFinded.error });

    return res.status(200).json(userFinded);
});

module.exports = {
    createUser,
    findAllUser,
    findUserById,
};
