const UserService = require("../services/user-service")
const InputValidationException = require("../exceptions/inputValidationException");
const twilio = require('twilio');

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
const Chatai=async(req,res)=>{
    try{
        const {id,question,answer}=req.body;
        const user = await UserService.chatai(id,question,answer);
        return res.status(200).send(user.chats);
    }
    catch(error){
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}
const Getchat = async(req, res) => {
try{
const id=req.params.id;
    const user = await UserService.getchat(id);
    return res.status(200).send(user);
}
catch(error){
    console.error(error);
    return res.status(500).send({ message: error.message });
}
}

const sendMessage = async (req, res) => {
    try {
        const userId = req.params.userId;
    
        const user = await UserService.getUserById(userId);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const msg = `Hello ${user.username}, your email is ${user.email}. Your appointment is coming up with Rahul soon. Would you like to call him instead of meeting him in person?`;

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);

        const message = await client.messages.create({
            body: msg,
            from: '+14808787901',
            to: '+918427533412'
        });

        console.log(`Message sent with SID: ${message.sid}`);
        res.status(200).send({ message: "Message sent successfully", messageSid: message.sid });
    } catch (error) {
        console.error(`Failed to send message. Error: ${error.message}`);
        res.status(500).send({ message: "Failed to send message", error: error.message });
    }
};
const SendQustion=async (req,res)=>{
    try{
        const id=req.params.userId;
        // console.log(id);
        const user = await UserService.sendQustion(id);
        return res.status(200).send(user);
    }
    catch(error){
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}
const profile=async(req,res)=>{
    try{
        const id=req.params.userId;
        console.log(id);
        const user = await UserService.Profile(id);
        return res.status(200).send(user);

    }
    catch(error){
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {
      const userId = req.params.userId;
      const updatedData = req.body;
      const user = await UserService.updateProfile(userId, updatedData);
      return res.status(200).send(user);
    } catch (error) {
      console.error(error);
      return res.status(error instanceof InputValidationException ? 400 : 500)
        .send({ message: error.message });
    }
  };



module.exports = { addNewUser, loginUser,googleloginUser, addMentalHealthQuestionnaire,
    updateMentalHealthQuestionnaire,Chatai,Getchat, sendMessage,SendQustion,profile, updateProfile };