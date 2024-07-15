const UserService = require("../services/user-service")
const InputValidationException = require("../exceptions/inputValidationException");

const addNewUser = async(req, res) => {
    try {
        console.log("Received payload:", req.body);
        const { username, email, password, confirmpassword } = req.body;
        if (typeof req.body !== 'object' || req.body === null) {
            throw new InputValidationException('Invalid payload format.');
        }
        let user = { username, email, password, confirmpassword };
        user = await UserService.addNewUser(user);
        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
        return res.status(error instanceof InputValidationException ? 400 : 500)
        .send({ message: error.message });
    }
}

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.loginUser(email, password);
        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}
const googleloginUser = async(req, res) => {
    try{
        const {email}=req.body;
        const user = await UserService.googleloginUser(email);
        return res.status(200).send(user);
    }
    catch(error){
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

const addMentalHealthQuestionnaire = async(req, res) => {
    try {
        const userId = req.params.userId;
        const answers = req.body;
        const user = await UserService.addMentalHealthQuestionnaire(userId, answers);
        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
        return res.status(error instanceof InputValidationException ? 400 : 500)
            .send({ message: error.message });
    }
}

const updateMentalHealthQuestionnaire = async(req, res) => {
    try {
        const userId = req.params.userId;
        const answers = req.body;
        const user = await UserService.updateMentalHealthQuestionnaire(userId, answers);
        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
        return res.status(error instanceof InputValidationException ? 400 : 500)
            .send({ message: error.message });
    }
}



module.exports = { addNewUser, loginUser,googleloginUser, addMentalHealthQuestionnaire,updateMentalHealthQuestionnaire}