const bcrypt= require('bcrypt')

const encryptPassword = async (plainTextPassword) =>{
    try {
        return await bcrypt.hash(plainTextPassword,8);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const checkPassword = async(plainTextPassword, encryptedPassword) => {
    return bcrypt.compare(plainTextPassword, encryptedPassword);
}

module.exports = {checkPassword, encryptPassword};
