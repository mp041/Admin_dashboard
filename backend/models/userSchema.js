const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema =  new mongoose.Schema({
    firstName :{
      type:  String,
      required : true,
      trim :  true,
    },
    lastName :{
      type: String,
      required : true,
      trim : true,
    },
    username : {
      type: String,
      required : true,
      trim : true,
      unique : true,
      index : true,
      lowercase : true,
    },
    email :{
      type: String,
      required : true,
      trim : true,
      unique : true,
    },
    hash_password : {
      type: String,
      required : true,
    },
    role : {
      type: String,
      enum : ['user', 'admin'],
      default : 'user',
    },
    contactNumber : {
      type: String,
    },
    profilePicture : {
      type: String,
    },
},{
  timestamps : true,
});


//Hash Password Directly from here.
userSchema.virtual('password')
  .set(function(password){
    this.hash_password = bcrypt.hashSync(password,10);
  })

//Getting FullName
userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`;
})


//Compare Hash Password.
userSchema.methods = {
    authentication : function(password){
      return bcrypt.compareSync(password, this.hash_password)
    }
}


module.exports = mongoose.model("User", userSchema);
