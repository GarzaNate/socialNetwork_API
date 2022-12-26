const { Schema, model } = require('mongoose');

// validate email helper function
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, 'Please enter a valid email']
        },
        // reference thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // self reference user schema
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// virtual property, grabs length of users friends
userSchema.virtuals('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;