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
        const user = await User.findByEmailAndPasswordForAuth(email, password);
        console.log(`User with Email: ${email} successfully logged in.`);
        return user;
    } catch (error) {
        console.error(`Login failed. The error is ${error}`);
        throw new InputValidationException(error.message);
    }
}

module.exports = {
    addNewUser,
    loginUser
};