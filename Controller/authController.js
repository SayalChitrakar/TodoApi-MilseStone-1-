const mongoose = require('mongoose');
const User = require("./../Model/UserModel");
const jwt = require('jsonwebtoken');

exports.signUp = async(request,response)=>{

    try{
        const newUser = await User.create(request.body);
        const token = jwt.sign({time:Date(),userId:newUser._id},"thisIsSecretKey");

        response
            .status(200)
            .json({
                token,
                user:newUser
            })
    }
    catch(error){
        console.log("error in signing up new user");
        console.log(error)
    }

}

exports.checkIfLogin =async (request,response,next)=>{

    try{
        let token;
        if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')){
            token = request.headers.authorization.split(' ')[1];
        }

        if(!token){

            return next(new Error('you are not logged in please login in to get access'));
        }

        let decode = await jwt.decode(token,"thisIsSecretKey");

        const verifiedUser = await User.findById(decode.userId);

        if(!verifiedUser){
            return next(new Error('the user belonging  to the token does not  exist'));
        }

        request.user = verifiedUser;
        next();

    }
    catch(error){
        console.log("error while checking user");
    }
}