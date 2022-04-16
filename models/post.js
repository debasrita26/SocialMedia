const mongoose = require('mongoose');
const addedDate=new Date();
const time=addedDate.toString();

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ], 
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    time:{
        type: Date,
        default: () => new Date()
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;