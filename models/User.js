const {Schema, model} = require('mongoose');

//user model,
const userSchema = new Schema(
    {
    username: {
        type: String, 
        unique: true, 
        required: true, 
        trimmed: true},

    email: {
        type: String, 
        unique: true, 
        required: true,
        //using regex to create valid email authentication
        match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    //will reference thought model
    thoughts: [
        {
            type:Schema.Types.ObjectId, 
            ref: 'Thought'
        }
    ],
    //will reference user model for friends model
    friends: [
        {
            type:Schema.Types.ObjectId, 
            ref: 'User'
        }
    ],
    },
   { 
    toJSON: {
        virtuals: true
    },
    
    id: false,
}
);

//will generate total friends
userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
    }
);

//initialize user models
const User = model ('user', userSchema);

module.exports = User;