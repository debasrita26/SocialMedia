const User = require('../models/user');
const Post=require('../models/post');
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
// const queue=require('../config/kue');
module.exports.profile = async function(req, res){
    try{
        let post=await Post.find({user: req.params.id})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user likes'
            }
        })
        .populate('likes');
        let user = await User.find({});
        let signInUserFriends = await User.find({ friendship: req.params.id }).populate('friendship', 'name email avatar');
        let signin_User = await User.findById(req.params.id);
    
        return res.render('user_profile',{
            title : "profile",
            profile_user : signin_User,
            posts : post,
            all_users : user,
            all_friends : signInUserFriends
        });


    }catch(err){
        console.log('ERROR',err);
        return;
    }
 
  
}

module.exports.update=async function(req,res){
    //if the current user is  the one being edited
        if(req.user.id=req.params.id){
            try{
                //find the user
                let user=await User.findById(req.params.id);
                User.uploadedAvatar(req,res,function(err){
                    if(err){ console.log('Multer Error',err)};
                        user.name=req.body.name;
                        user.email=req.body.email;
                        if(req.file){
                            if(user.avatar){
                                fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                            }
                            user.avatar=User.avatarPath+'/'+req.file.filename;
                        }
                        user.save();
                        return res.redirect('back');
                });
            }catch(err){
                req.flash('error',err);
                return res.redirect('back');
            }

        }else{
            req.flash('error', 'Unauthorized');
            res.status(401).send('Unauthorized');
        }
    }
//     if(req.user.id=req.params.id){
//         User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
//             req.flash('success', 'Updated!');
//             return res.redirect('back');
//         });
//     }
//     else{
//         req.flash('error', 'Unauthorized');
//         res.status(401,send('Unauthorized'));
//     }
// }

// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Sociobuzz Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Sociobuzz Sign In"
    })
}

module.exports.about = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('about', {
        title: "Sociobuzz About"
    }) 
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error',err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error',err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success','You have signed up,login to continue!');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success','logged out');
    return res.redirect('/');
}


module.exports.resetPassword = function(req, res)
{
    return res.render('reset_password',
    {
        title: 'Sociobuzz Reset Password',
        access: false
    });
}

module.exports.resetPassMail = function(req, res)
{
    User.findOne({email: req.body.email}, function(err, user)
    {
        if(err)
        {
            console.log('Error in finding user', err);
            return;
        }
        if(user)
        {
            if(user.isTokenValid == false)
            {
                user.accessToken = crypto.randomBytes(30).toString('hex');
                user.isTokenValid = true;
                user.save();
            }

            let job = queue.create('user-emails', user).save(function(err)
            {
                if(err)
                {
                    console.log('Error in sending to the queue', err);
                    return;
                }
                // console.log('Job enqueued', job.id);
            });

            req.flash('success', 'Password reset link sent. Please check your mail');
            return res.redirect('/');
        }
        else
        {
            req.flash('error', 'User not found. Try again!');
            return res.redirect('back');
        }
    });
}

module.exports.setPassword = function(req, res)
{
    User.findOne({accessToken: req.params.accessToken}, function(err, user)
    {
        if(err)
        {
            console.log('Error in finding user', err);
            return;
        }
        if(user.isTokenValid)
        {
            return res.render('reset_password',
            {
                title: 'Sociobuzz Reset Password',
                access: true,
                accessToken: req.params.accessToken
            });
        }
        else
        {
            req.flash('error', 'Link expired');
            return res.redirect('/users/reset-password');
        }
    });
}

module.exports.updatePassword = function(req, res)
{
    User.findOne({accessToken: req.params.accessToken}, function(err, user)
    {
        if(err)
        {
            console.log('Error in finding user', err);
            return;
        }
        if(user.isTokenValid)
        {
            if(req.body.newPass == req.body.confirmPass)
            {
                user.password = req.body.newPass;
                user.isTokenValid = false;
                user.save();
                req.flash('success', "Password updated. Login now!");
                return res.redirect('/users/sign-in') 
            }
            else
            {
                req.flash('error', "Passwords don't match");
                return res.redirect('back');
            }
        }
        else
        {
            req.flash('error', 'Link expired');
            return res.redirect('/users/reset-password');
        }
    });
}