const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 128,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: timeCreated => moment(timeCreated).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true,
        },
        // array of nested documents
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    }
);

// reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: timeCreated => moment(timeCreated).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

thoughtSchema.virtuals('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;