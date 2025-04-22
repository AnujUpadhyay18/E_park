const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { log } = require('handlebars');
const moment = require("moment-timezone");

const UserSchema = new mongoose.Schema
({
    User_name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true
    },
    lastLogin: { type: Date, default: null },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    products:[{
        productID:{
            type:String,
            required:true
        },
        productName:{
            type:String,
            required:true
        },
        productPrice:{
            type:String,
            required:true
        },
        productImage:{
            type:String,
            default:null
        },
        productDate:{
            type:Date,
            default:null
        }
    }],
});

UserSchema.pre("save", async function(next){
    if(this.isModified("password"))
    {
        console.log(this.password)
        this.password =await bcrypt.hash(this.password,10)
        console.log(this.password)
    }
    next()
})
// tokens 
UserSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, "kjrvgkrewgfuwgfvjkjewqwgfueqgf", { expiresIn: '1h' });
        this.tokens = this.tokens.concat({ token }); 
        await this.save();
        return token;
      } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Error generating token');
      }
}

const Register = new mongoose.model('userdata1',UserSchema);
module.exports = Register;