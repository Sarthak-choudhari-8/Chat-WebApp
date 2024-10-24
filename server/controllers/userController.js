const User = require("../model/userModel");
const bcrypt = require("bcrypt");


module.exports.register =  async (req,res,next) =>{
try{   
    //  console.log(req.body);
    let {username ,  password ,  email } = req.body; 
const userNameCheck = await  User.findOne({username});

if(userNameCheck){
    return res.json({msg:"Username already Used " ,status:false });
}

const emailCheck = await  User.findOne({email});
if(emailCheck){
    return res.json({msg:"email already Used " ,status:false });
}

const hashedPass = await bcrypt.hash(password, 10);
const user = await User.create({

email,
username,
password:hashedPass,

});
delete user.password;
return res.json({status:true , user});
}
catch(ex){
    next(ex);
}

}


//////////////////


module.exports.login =  async (req,res,next) =>{
    try{   
        //  console.log(req.body);
        let {username ,  password  } = req.body; 
    let user = await  User.findOne({username});
    
    if(!user){
        return res.json({msg:"incorrect Username or Password " ,status:false });
    }
    
 
    
let isPasswordValid  = await bcrypt.compare(password , user.password)  ;



if(!isPasswordValid){
    return res.json({msg:"incorrect Username or Password " , status:false });
}

delete user.password;


    return res.json({status:true , user});


    }

    catch(ex){
        next(ex);
    }
    
    }


/////////////////


    module.exports.setAvatar = async (req, res, next) => {
        try {
          const userId = req.params.id;
const avatarImage = req.body.image;
const userData = await User.findByIdAndUpdate(userId ,{
  isAvatarImageSet :true,
  avatarImage,
})
return res.json({
isSet:userData.isAvatarImageSet,
image:userData.avatarImage,

})

        } catch (ex) {
          next(ex);
        }
      };
      

      /////////////////

module.exports.getAllUsers = async (req,res,next) => {
try{

const users  = await User.find({_id :{$ne: req.params.id}}).select([
"email",
"username",
"avatarImage",
"_id",

]);

return res.json(users);

} catch (ex) {
    next(ex);
  }

}