class InputValidationException extends Error {
    constructor(message){
        super(message);
    }
}

module.exports=InputValidationException;