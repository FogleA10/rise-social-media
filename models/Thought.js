const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const ReactionSchema = require('./Reaction')

const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        maxlength:280,
        minlength:1
        
      },
      createdAt: {
        type: Date ,
          default: Date.now,
          get: timestamp => dateFormat(timestamp) 
       
      },
      username: 
        {
            type:String,
            required: true
        }
      ,
    
      reactions: [ReactionSchema]
    
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      // prevents virtuals from creating duplicate of _id as `id`
      id: false
    }
  );
  
  // get total count of comments and replies on retrieval
  ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
  });
  
  const Thought = model('Thought', ThoughtSchema);
  
  module.exports = Thought;