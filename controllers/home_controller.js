const Post = require('../models/post');
const User=require('../models/user');


module.exports.home = async function(req, res){
    try{
    // populate the user of each post
    let posts =await  Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        },
        populate: {
            path: 'likes'
        }
    }).populate('comments')
    .populate('likes');
    
    //.exec(function(err, posts){

    let users =await User.find({});
    //,function(err,users){
            return res.render('home', {
                title: "Codeial | Home",
                posts:  posts,
                all_users: users
            });
}catch(err){
    console.log('err');
    return;
}
} 

// module.exports.actionName = function(req, res){}