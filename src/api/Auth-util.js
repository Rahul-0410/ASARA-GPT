import { logInUser, signUp } from "./user-Api";

const getLocalStorageUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

const loginUserFunction = async ({email, password}) => {
    const user = await logInUser({email, password});
    setUser(user);
    return user;
}

const SignupUser = async (userData) => {
    const user = await signUp(userData);
    setUser(user);
    return user;
}

export { 
    loginUserFunction as loginUser,
    SignupUser,
    getLocalStorageUser
};