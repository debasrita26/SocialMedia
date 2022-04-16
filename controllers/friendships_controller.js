const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.addFriend = async function(req , res){

    try{
        
        let fromUser = await User.findById(req.user._id);
        let toUser = await User.findById(req.query.toid);

        // let friend = await Friendship.create({
        //     to_user : req.query.toid,
        //     from_user : req.user._id
        // })

        if(!fromUser.friendship.includes(req.query.toid)){
            fromUser.friendship.push(req.query.toid);
            fromUser.save();
            toUser.friendship.push(req.user._id);
            toUser.save();
            req.flash('success','Friend Created');
        }else{
            req.flash('error','Friend Already Exists');
        }
        return res.redirect('back');


    }catch(err){
        console.log("Error in creating friends", err);
        return res.redirect('back');
    }
}

//     let existingFriendship = await Friendship.findOne({
//         from_user : request.user,
//         to_user : request.query.id,
//     });

//     let toUser = await User.findById(req.user);
//     let fromUser = await User.findById(req.query.id);

//     let deleted = false;

//     if(existingFriendship){
//         toUser.friends.pull(existingFriendship._id);
//         fromUser.friends.pull(existingFriendship._id);
//         toUser.save();
//         fromUser.save();
//         existingFriendship.remove();
//         deleted = true;
//         removeFriend = true;
//     }else{
//         let friendship = await Friendship.create({
//             to_user : req.query.id,
//             from_user : req.user._id
//         });

//         toUser.friends.push(friendship);
//         fromUser.friends.push(friendship);
//         toUser.save();
//         fromUser.save();
//     }

//     if(request.xhr){
//         return res.status(200).json({
//             deleted : deleted , 
//             message : "Request Successful",
//         });
//     }


//     console.log(populated_user);
//      return res.redirect('back');
// }

module.exports.destroy = async function(req,res){
    try{
        
        let fromUser = await User.findById(req.user._id);
        let toUser = await User.findById(req.query.toid);

        await User.findByIdAndUpdate(fromUser,{$pull : {friendship : req.query.toid}});
        await User.findByIdAndUpdate(toUser,{$pull : {friendship : req.user._id}});

        req.flash('success','Friend deleted');
        return res.redirect('back');

    }catch(err){
        console.log("Error in creating friends", err);
        return res.redirect('back');
    }
}