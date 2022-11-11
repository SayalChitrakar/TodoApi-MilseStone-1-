const todoModel = require('./../Model/TodoModel');
const userModel = require('./../Model/UserModel');

const {request, response} = require("express");
const moveTask = require("./../utils/moveTask");

exports.getAllToDos = async (request,response)=>{

    const user = request.user;
    const todo = await todoModel.Todo.find({user:user._id}).sort("position").select(["-user","-__v"]);

    response
        .status(200)
        .json({
            status:"success",
            data:todo
        })

}

exports.getAllProgress = async (request,response)=>{

    //const progress = await userModel.findById(user).populate('userProgress').select("userProgress");
   // const progress = await todoModel.Progress.find().sort({position:1}).select("-__v").select("-position");
    const user = request.user;
    console.log(user);
    const progress = await todoModel.Progress.find({user:user._id}).sort("position");
    response
        .status(200)
        .json({
            status:"success",
            data:progress
        })
}

exports.getAllTesting = async (request,response)=>{

    //const testing = await todoModel.Testing.find().sort({position:1}).select("-__v").select("-position");
    const user = request.user;
    const testing = await todoModel.Testing.find({user:user._id}).sort("position");
    response
        .status(200)
        .json({
            status:"success",
            data:testing
        })
}

exports.getAllDone = async (request,response)=>{

    //const done = await todoModel.Done.find().sort({position:1}).select("-__v").select("-position");
    const user = request.user;
    const done = await todoModel.Done.find({user:user._id}).sort("position");
    response
        .status(200)
        .json({
            status:"success",
            data:done
        })
}

exports.addTodo = async (request,response)=>{

    const todoBody = request.body;
    const user = request.user;
    const requestData = {
        title :todoBody.title,
        position : todoBody.position,
        user:user
    }
    const todo = await todoModel.Todo.create(requestData);

    response
        .status(200)
        .json({
            status:"success",
            data: todo
        })
}



exports.moveTodo = async (request,response)=>{


    const {replaceBy, replaceTo} = request.body;

    const by = await todoModel.Todo.findById(replaceBy);
    const to  = await todoModel.Todo.findById(replaceTo);

    const byPos = by.position;
    const toPos = to.position;

    const byId = by._id.toString();
    const toId = to._id.toString();

    await todoModel.Todo.findByIdAndUpdate(byId,{position:toPos},function(err,doc){
        if(err){
            console.log(err);
        }
        console.log("from by",doc);
    }).clone();
    await todoModel.Todo.findByIdAndUpdate(toId,{position:byPos},function (err,doc){
        if(err){
            console.log(err);
        }
        console.log("from to",doc);
    }).clone();

    response
        .status(200)
        .json({
        data:"success"
          })
}

exports.moveToProgress = async (request,response,next)=>{
    const id = request.params.id;
    const userId = request.user;
    moveTask(request,response,id,todoModel.Todo,todoModel.Progress);

}

exports.moveToTesting =  async (request,response,next)=>{
    const id = request.params.id;
    const userId = request.user;
    moveTask(request,response,id,todoModel.Progress,todoModel.Testing);
}

exports.moveToDone =  (request,response,next)=>{
    const id = request.params.id;
    const userId = request.user;
    moveTask(request,response,id,todoModel.Testing,todoModel.Done);

}

