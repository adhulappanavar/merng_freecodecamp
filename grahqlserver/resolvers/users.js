const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../models/users');
const {validateRegisterInput} = require ('../utils/validators')

const { SECRET_KEY } = require('../config');



function generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
  }



module.exports = {
    Mutation: {

      async register(
        _,
        {
          registerInput: { username, email, password, confirmPassword }
        }
      ) {

        // 1. Validate user data
        const { valid, errors } = validateRegisterInput(
            username,
            email,
            password,
            confirmPassword
          );
          if (!valid) {
            throw new UserInputError('Errors', { errors });
          }


        // 2.  Make sure user doesnt already exist
        const user = await User.findOne({ username });
        if (user) {
            throw new UserInputError('Username is taken', {
                errors: {
                username: 'This username is taken'
                }
            });
        }

        // 3. hash password and create an auth token
        password = await bcrypt.hash(password, 12);
  
        const newUser = new User({
          email,
          username,
          password,
          createdAt: new Date().toISOString()
        });
  
        const res = await newUser.save();
  
        const token = generateToken(res);
  
        return {
          ...res._doc,
          id: res._id,
          token
        };
      }
    }
  };