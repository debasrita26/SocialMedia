const Post = require('../models/post');
const User=require('../models/user');
const friendship=require('../models/friendship');

module.exports.home = async function(req, res){
    try{
    // populate the user of each post
    let posts =await  Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user likes'
        }
    })
    .populate('likes');
    
    //.exec(function(err, posts){

    let users =await User.find({});

    let signInUserFriends;
    if(req.user){
     signInUserFriends = await User.findById(req.user._id)
     .populate('friendship', 'name email avatar');
    }

    //,function(err,users){
            return res.render('home', {
                title: "Sociobuzz home",
                posts:  posts,
                all_users: users,
                all_freinds: signInUserFriends
            });
}catch(err){
    console.log('err');
    return;
}
} 

// module.exports.actionName = function(req, res){}