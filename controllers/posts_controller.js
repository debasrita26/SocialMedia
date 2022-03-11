const Post = require('../models/post');
const Comment = require('../models/comment');
const Like=require('../models/like');

module.exports.create =async function(req, res){
    try{
        let post=await Post.create({
        content: req.body.content,
        user: req.user._id
    });

    if(req.xhr){
        post = await post.populate('user', 'name').execPopulate();

        return res.status(200).json({
            data: {
                post: Post
            },
            message:"post created"
        });
    }
    req.flash('success','Post created');
    return res.redirect('back');
    
    }catch(err){
        req.flash('error',err); 

        console.log(err);
        return res.redirect('back');
    }
}


module.exports.destroy =async function(req, res){
    try{
    let post=await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id){
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();
            
            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message:"post deleted"
                });
            }
            req.flash('success','Post and associted comments deleted');
                return res.redirect('back');

        }else{
            req.flash('success','You cannot delete this post');
            return res.redirect('back');
        }

    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}