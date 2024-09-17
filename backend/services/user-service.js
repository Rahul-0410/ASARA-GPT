const User = require("../model/user-model")
const InputValidationException = require("../exceptions/inputValidationException");

const addNewUser = async (user) => {
    try {
        console.log("Creating user with payload:", user);
        user = new User(user);
        await user.save();
        console.log(`User with ID: ${user._id} was added in the database`);
        return user;
    } catch (error) {
        console.error(`Please enter the valid fields. The error is ${error}`);
        throw new InputValidationException(error.message);
    }
}

const loginUser = async (email, password) => {
    try {
        console.log(`Attempting to login with email: ${email} and password: ${password}`);
        const user = await User.findByEmailAndPasswordForAuth(email, password);
        console.log(`User with Email: ${email} successfully logged in.`);
        return user;
    } catch (error) {
        console.error(`Login failed. The error is ${error}`);
        throw new InputValidationException(error.message);
    }
}
const googleloginUser = async (email) => {
    try {
        console.log(`Attempting Google login with email: ${email}`);
        let user = await User.findOne({ email: email });
        if (!user) {
            user = new User({ username: email.trim().split('@')[0], email: email });
            await user.save();
        }
        console.log(`User with Email: ${email} successfully logged in via Google.`);
        return user;
    } catch (error) {
        console.error(`Google login failed. The error is ${error}`);
        throw new InputValidationException(error.message);
    }
}
const addMentalHealthQuestionnaire = async (userId, answers) => {
    try {
        console.log(`Adding mental health questionnaire for user ID: ${userId}`);
        console.log('Received answers:', answers);  
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { mentalHealthInfo: answers } },
            { runValidators: true }
        );
        console.log('Updated user:', user);  // Add this line
        if (!user) {
            throw new Error('User not found');
        }
        console.log(`Mental health questionnaire added for user ID: ${userId}`);
        return user;
    } catch (error) {
        console.error(`Failed to add mental health questionnaire. The error is ${error}`);
        throw new InputValidationException(error.message);
    }
}

const updateMentalHealthQuestionnaire = async (userId, answers) => {
    try {
        console.log(`Updating mental health questionnaire for user ID: ${userId}`);
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.mentalHealthInfo) {
            throw new Error('Mental health questionnaire not found. Please add it first.');
        }
        user.mentalHealthInfo = { ...user.mentalHealthInfo, ...answers };
        await user.save();
        console.log(`Mental health questionnaire updated for user ID: ${userId}`);
        return user;
    } catch (error) {
        console.error(`Failed to update mental health questionnaire. The error is ${error}`);
        throw new InputValidationException(error.message);
    }
}
const chatai=async(id,question,answer)=>{
    try{
        const user=await User.findByIdAndUpdate(id,{$push:{chats:{question,airesponse:answer}}})
        console.log(user)
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
      console.log(`Updating profile for user ID: ${userId}`);
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
  
      console.log(`Profile updated for user ID: ${userId}`);
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