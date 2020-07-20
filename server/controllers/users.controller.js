const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
//const validator = require('email-validator');
const config = require('../config');
const utils = require('../utils/utils');
const Member = require('../models/MemberModel');
const User = require('../models/UserModel');

const saltRounds = parseInt(process.env.SALT_ROUNDS_BCRYPT) || 10;
const PRIVATE_KEY = fs.readFileSync(path.resolve('./keys/private.pem')); // user for token encryption

// Module to signup users
module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  // validate fields
  if(!(name && password && email)){
    return res
      .status(400)
      .send('Error!!Please enter all required fields.');
  }

  // validate email
  /*if(!validator.validete(email)){
    return res
      .status(400)
      .send('Error!!Please enter valid email.');
  }*/

  const isUser = await User.findOne({ email });
  // validate user exists 
  if(isUser){
    return res
      .status(400)
      .send('User already registered!')
  }

  bcrypt.hash(password, saltRounds, async (err, hashedPwd) => {

    const user = new User({name, email, password: hashedPwd});
    try{
      if (err) throw err;
      const userInstance = await user.save();
      // Generate token for verifying client
      /*const token = jwt.sign({
            userId : userInstance.id
          }, PRIVATE_KEY, { algorithm: 'RS256' });*/
      const token = await utils.generateJwtToken({
            userId : userInstance.id
          }, PRIVATE_KEY); 

      // 201 status fro POST (created) request
      res.status(201).json({
        id: userInstance.id,
        name: userInstance.name,
        email: userInstance.email,
        token: token
      });
    }
    catch (error) {
      console.log(error);
      res.status(400).send('Failed to signup user');
    }
  });
}

// Module to login users
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("login:", email);
  // validate fields
  if(!(password && email)){
    return res
      .status(400)
      .send('Error!!Please enter all required fields.');
  }

  const userInstance = await User.findOne({ email });
  // validate user exists 
  if(!userInstance){
    return res
      .status(401)
      .send('Invalid email or password.');
  }

  bcrypt.compare(password, userInstance.password, async (err, pwdMatched) =>{
    //console.log(isMatch);
    if(pwdMatched){
      try{
        // Generate token for verifying client
        const token = await utils.generateJwtToken({
            userId : userInstance.id
          }, PRIVATE_KEY);

        return res.status(200).json({
          id: userInstance.id,
          name: userInstance.name,
          email: userInstance.email,
          token: token,
          logged_in: true,
        });
      }
      catch (error) {
        console.log(error);
        res.status(400).send({'msg':'Failed to fetch group'});
      }
    }
    else{
      res.status(400).send({'msg':'Password does not match'});
    }
  });
  
}

// Dashboard
module.exports.dashboard = async (req, res, next) => {
  try{
      let userInstance = await User.findById(req.userId);
      return res.status(200).json({
        id: userInstance.id,
        name: userInstance.name,
        email: userInstance.email,
        logged_in: true,
      });
  }
  catch(error){
      return res.status(500).send();
  }
}

// Logout user
module.exports.logout = async (req, res) => {
    try {
      // Send response if success
      res.status(200).json({
        msg: "You're logged out successfully!"
      });
    } catch (error) {
      console.log(error);
      res.status(400).send('Failed to logout ');
    }
};
