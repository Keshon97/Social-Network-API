const { Schema, model, Types } = require('mongoose');
const moment = require ('moment');

//create reaction schema
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
            //using moment to format time
            get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
        },
    },
    {
    toJSON: {
        getters: true,
    },
    }
);

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
            //array for reaction subdocument
        reactions: [reactionSchema],
    },
    {
    toJSON: {
        virtauls: true,
        getters: true,
    },
    
    id: false,
    }
);

//will generate reaction count
thoughtSchema.virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    }
);

//initialize thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;