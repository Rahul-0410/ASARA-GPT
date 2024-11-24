const User = require("../model/user-model")
const InputValidationException = require("../exceptions/inputValidationException");

const addNewUser = async (user) => {
    try {
        
        user = new User(user);
        await user.save();
        
        return user;
    } catch (error) {
        console.error(`Please enter the valid fields. The error is ${error}`);
        throw new InputValidationException(error.message);
    }
}

const loginUser = async (email, password) => {
    try {
        
        const user = await User.findByEmailAndPasswordForAuth(email, password);
        
        return user;
    } catch (error) {
        console.error(`Login failed. The error is ${error}`);
        throw new InputValidationException(error.message);
    }
}
const googleloginUser = async (email) => {
    try {
        
        let user = await User.findOne({ email: email });
        if (!user) {
            user = new User({ username: email.trim().split('@')[0], email: email });
            await user.save();
        }
        
        return user;
    } catch (error) {
        console.error(`Google login failed. The error is ${error}`);
        throw new InputValidationException(error.message);
    }
}
const addMentalHealthQuestionnaire = async (userId, answers) => {
    try {
        
        
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { mentalHealthInfo: answers } },
            { runValidators: true }
        );
        
        if (!user) {
            throw new Error('User not found');
        }
        
        return user;
    } catch (error) {
        console.error(`Failed to add mental health questionnaire. The error is ${error}`);
        throw new InputValidationException(error.message);
    }
}

const updateMentalHealthQuestionnaire = async (userId, answers) => {
    try {
        
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.mentalHealthInfo) {
            throw new Error('Mental health questionnaire not found. Please add it first.');
        }
        user.mentalHealthInfo = { ...user.mentalHealthInfo, ...answers };
        await user.save();
        
        return user;
    } catch (error) {
        console.error(`Failed to update mental health questionnaire. The error is ${error}`);
        throw new InputValidationException(error.message);
    }
}
const chatai=async(id,question,answer)=>{
    try{
        const user=await User.findByIdAndUpdate(id,{$push:{chats:{question,airesponse:answer}}})
        
        return user
    }catch(error){
        console.error(error)
        throw new InputValidationException(error.message)
    }
}
const getchat=async function(id){
    const user = await User.findById(id)
    try{
        return user.chats;
    }
    catch(error){
        console.error(error)
        throw new InputValidationException(error.message)
    }

}

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error(`Failed to retrieve user. The error is ${error}`);
        throw new InputValidationException(error.message);
    }
};
const sendQustion=async (id)=>{
    try{
        const user = await User.findById(id);
        
        return user.mentalHealthInfo;
    }catch(error){
        console.error(error)
        throw new InputValidationException(error.message)
    }
 
}
const Profile=async (id)=>{
    try{
        const user=await User.findById(id)
        return user;
    }
    catch(error){
        console.error(error)
        throw new InputValidationException(error.message)
    }
}

const updateProfile = async (userId, updatedData) => {
    try {
      
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            username: updatedData.name,
            city: updatedData.city,
            state: updatedData.state,
            country: updatedData.country
          }
        },
        { new: true, runValidators: true }
      );
  
      if (!user) {
        throw new Error('User not found');
      }
  
      
      return user;
    } catch (error) {
      console.error(`Failed to update profile. The error is ${error}`);
      throw new InputValidationException(error.message);
    }
  };

module.exports = {
    addNewUser,
    loginUser,
    googleloginUser,
    addMentalHealthQuestionnaire,
    updateMentalHealthQuestionnaire,
    chatai,getchat,
    getUserById,
    sendQustion,
    Profile,
    updateProfile
};