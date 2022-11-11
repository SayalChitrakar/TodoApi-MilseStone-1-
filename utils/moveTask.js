
moveTask = async( request,response,id,model1,model2)=>{

    const todo = await model1.findById(id).select("-_id").select("-__v");
    const sendTodo = todo.toJSON()

    const progress = await model2.create(sendTodo);

    await model1.findByIdAndDelete(id);
    response
        .status(200)
        .json({
            data:progress
        })
}
module.exports = moveTask;