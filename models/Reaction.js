const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280
       
      },
      username: 
        {
            type:String,
            required: true
        }
      ,
    
      createdAt: 
        {
          type: Date ,
          default: Date.now,
          get: timestamp => dateFormat(timestamp) 
    
        }
      
    },
    {
      toJSON: {
        getters: true
      },
      // prevents virtuals from creating duplicate of _id as `id`
      id: false
    }
  );
  
  
  
  
  module.exports = ReactionSchema;