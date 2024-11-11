const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const users=new Schema({
    name:String,
    email:String,
    password:String
});
const todos=new Schema({
    desc:String,
    done:Boolean,
    userID:ObjectId
});


const UserModel=mongoose.model('users',users);
const todoModel=mongoose.model('todos',todos);

UserModel.create({
    email:"anjali@gmail.com",
    name:"anjali",
    password:"2312"
})
module.exports={
    UserModel:UserModel,
    todoModel:todoModel
}