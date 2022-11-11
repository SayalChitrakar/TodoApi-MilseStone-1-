const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({

    title:{
        type:String,
        require:[true,'please enter the title of the todo'],
    },
    position :{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }

})
const todoCounterSchema = new mongoose.Schema({
    id:{
        type:String,
    },
    pos :{
        type:Number,
        default:0
    },
    user:{
    type:mongoose.Schema.ObjectId,
        ref:'User'
    }

})

const progressSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true,'progress task with no name is invalid'],
        unique :[true,"the title already exist"]
    },
    position :{
        type:Number,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
})

const testingSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true,'testing task with no name is invalid'],
        unique :[true,"the title already exist"]
    },
    position :{
        type:Number,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
})

const doneSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true,'done task with no name is invalid'],
        unique :[true,"the title already exist"]
    },
    position :{
        type:Number,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
})
const Counter = mongoose.model('TodoCounter',todoCounterSchema);
todoSchema.pre('save',async function(next){

    const counterPos = await Counter.findOneAndUpdate(
        {id:"autoVal"},
        {"$inc":{"pos":1}},
        {new:true},(error,currentData)=>{

            if(currentData ===null){
                const newVal = new Counter ({id:"autoVal",pos:1})
                newVal.save();
                this.position = 1;
            }

        }
    ).clone();

   if(counterPos){
       this.position = counterPos.pos;
   }

})

const Todo = mongoose.model('Todo',todoSchema);
const Progress = mongoose.model('Progress',progressSchema);
const Testing = mongoose.model('Testing',testingSchema);
const Done = mongoose.model ('Done',doneSchema);

module.exports = {Todo,Counter,Progress,Testing,Done};