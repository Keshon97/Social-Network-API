const { Schema, model, Types } = require('mongoose');
const moment = require ('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1, 
            maxlength: 280,},

        createdAt: {
            type: Date, 
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
        },

        username: {
            type: String,
             required: true
            },

        reactions: [reactionSchema],

        toJSON: {
            virtauls: true,
            getters: true,},
        
        id: false,

    }
);

const reactionSchema = new Schema (
    {
        reaction_id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.objectID(),
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
        },
        toJSON: {
            getters: true,
        },
    }
);

thoughtSchema.virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;