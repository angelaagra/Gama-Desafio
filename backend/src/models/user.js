import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const formSchema = new Schema({
    cpf:{
        type:Number,
        required:true,
        unique:true,
    },
    nome:{
        type:String,
        required:true,
    },
    nasc:{
        type:Date,
        required:true,
    },
    cep:{
        type:String,
        required:true,
    },
    log:{
        type:String,
        required:true,
    },
    endNum:{
        type:Number,
        required:true,
    },
    bairro:{
        type:String,
        required:true,
    },
    cidade:{
        type:String,
        required:true,
    },
    estado:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    prof:{
        type:String,
        required:true,
    },
    cel:{
        type:Number,
        required:true,
    },
    tel:{
        type:Number,
    },
    genero:{
        type:String,
        required:true,
    },
    rg:{
        type:Number,
    },
    cnh:{
        type:Boolean,
    },
    temCarro:{
        type:Boolean,
    },
    viagem:{
        type:Boolean,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    },{timestamps:true
    },
);

const User = mongoose.model('User',formSchema);

export default  User;