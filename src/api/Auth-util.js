import { logInUser, signUp } from "./user-Api";
import AsraApiBackend from "./Asra-api";
import axios from "axios";
const getLocalStorageUser = () => {
    return JSON.parse(localStorage.getItem("id"));
}

const setUser = (user) => {
    localStorage.setItem("id", JSON.stringify(user));
}

const loginUserFunction = async ({email, password}) => {
    const user = await logInUser({email, password});
    setUser(user._id);
    return user;
}

const SignupUser = async (userData) => {
    const user = await signUp(userData);
    return user;
}
const GoogleloginUser = async (userData) => {
    // Make API call to Google OAuth server to get user's email
    const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${userData}`);
    const { email } = response.data;
    console.log(email);
    const user = await AsraApiBackend.post("/user/googlelogin", {email})
    setUser(user.data._id);
    return user;

};
export { 
    loginUserFunction as loginUser,
    SignupUser,
    GoogleloginUser,
    getLocalStorageUser,
};