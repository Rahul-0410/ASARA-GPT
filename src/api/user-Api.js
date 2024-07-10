import AsraApiBackend from "./Asra-api";

export const logInUser = async({email,password}) => {
    const rep = await AsraApiBackend.post("/user/login", {email, password});
    console.log(rep)
    return rep.data;
};

export const signUp = async(userData) => {
    const {data} = await AsraApiBackend.post("/user/signup", userData);
    return data;
}