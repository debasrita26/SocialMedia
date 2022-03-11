const User = require("../models/user");
const Friendship = require("../models/friendship");



module.exports.addFriend = async function(req , res){


    let existingFriendship = await Friendship.findOne({
        from_user : request.user,
        to_user : request.query.id,
    });

    let toUser = await User.findById(req.user);
    let fromUser = await User.findById(req.query.id);

    let deleted = false;

    if(existingFriendship){
        toUser.friends.pull(existingFriendship._id);
        fromUser.friends.pull(existingFriendship._id);
        toUser.save();
        fromUser.save();
        existingFriendship.remove();
        deleted = true;
        removeFriend = true;
    }else{
        let friendship = await Friendship.create({
            to_user : req.query.id,
            from_user : req.user._id
        });

        toUser.friends.push(friendship);
        fromUser.friends.push(friendship);
        toUser.save();
        fromUser.save();
    }

    if(request.xhr){
        return res.status(200).json({
            deleted : deleted , 
            message : "Request Successful",
        });
    }


    console.log(populated_user);
     return res.redirect('back');
}